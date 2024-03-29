import { useState, useEffect } from "react";
import { ErrorBoundary } from 'ice';
import { useDocumentVisibility, useInterval } from 'ahooks';
import { useRequest } from 'ice';

import userService from '@/services/api';
import text from '@/locales';

import Down from '@/components/Down';
import Rules from '@/components/Rules';
import Tips from '@/components/Tips';

import styles from './index.module.css';
import base from '@/assets/base.png';

type historyType = {

  index: number

  chip: number

}

const Index = () => {
  const { request: clientLog } = useRequest(userService.clientLog, {
    refreshOnWindowFocus: true
  });
  const myErrorHandler = (error) => {
    clientLog({ error: `${error}` })
  }
  return (
    <ErrorBoundary
      onError={myErrorHandler}
    >
      <Home />
    </ErrorBoundary>
  )
}
const Home = () => {

  const [ showRules, setRules ] = useState<boolean>(false);
  const [ showTips, setTips] = useState<boolean>(false);
  const [ end, setEnd ] = useState<boolean>(false);
  const [ history, setHistory ] = useState<historyType[]>([]);
  const { data, request: getSection, mutate } = useRequest(userService.getSection, {
    refreshOnWindowFocus: true
  });
  const { data: polling, request: getPolling, cancel: cancelPolling } = useRequest(userService.getSection, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  });
  const { data: result, request: getResult, mutate: setrResult } = useRequest(userService.getActionResult);
  const { request: postResult } = useRequest(userService.postFerrisGo);
  const documentVisibility = useDocumentVisibility();

  useEffect(() => {
    getSection();
    getPolling();
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    getSection();
  }, [documentVisibility]);

  useEffect(() => {
    if (polling && data) {
      const temp = {
        ...data,
        reward: data.reward.map((item, index) => {
          return {
            ...item,
            max_num: polling.reward[index].max_num
          }
        })
      };
      mutate(temp)
    }
  }, [ polling ]);

  const handleAdd = async (index: number, chip: number) => {
    const temp = { ...data };
    const num:number = data.bet[chip].diamond;
    const res = await postResult([{
      rewardId: temp.reward[index].id,
      betId: data.bet[chip].id
    }]);
    if (res.code === 1) {
      temp.reward[index].num += num;
      setHistory([ ...history, { index, chip }]);
      temp.balance -= num;
    }
    mutate(temp);
  }

  const handleStatus = () => {
    if (!data) {
      return;
    }
    let { bet_duration, started_seconds, duration, showTime } = data.info;
    started_seconds += 1;
    showTime = bet_duration - started_seconds;
    if (bet_duration - started_seconds < 1) {
      cancelPolling();
    }
    if (bet_duration - started_seconds <= 0) {
      setEnd(true);
    }
    let temp = {
      ...data,
      info: {
        ...data.info,
        started_seconds,
        showTime
      }
    }
    mutate(temp);
    if (duration - started_seconds <= 0) {
      setEnd(false)
      getSection();
      getPolling();
      setHistory([]);
    }
  }

  const handleGo = async (rewardId:number, betId:number) => {
    if (data.info.showTime <= 0) {
      return;
    }
    let betItem:Array<object> = [{
      rewardId,
      betId
    }];
    const res = await postResult(betItem);
    if (res.code !== 1) {
      getSection();
    }
  }

  useEffect(() => {
    let timer;
    if (result) {
      return setEnd(false);
    }
    if (end) {
      timer = setInterval(() => {
        getResult();
      }, 1000);
    }
    return () => {
      clearInterval(timer)
    };
  }, [ end, result ]);

  useEffect(() => {
    let timer;
    if (result) {
      let { showTime } = data.info;
      let speed = showTime * -1 * 1000;
      timer = setTimeout(() => {
        setrResult(null)
      }, 10000 - speed);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [ result ])

  useInterval(() => {
    handleStatus();
  }, 1000);

  const handleTips = () => {
    setTips(true);
    setTimeout(() => {
      console.log('11')
      setTips(false)
    }, 3000)
  }


  return (
    <div className={styles.main}>
      <div className={styles.center}>
        <div className={styles.content}>
          <div className={styles.wrap}>
            {/* <div className={styles.leftW}> */}
              <div className={`${styles.rows} ${styles.records}`}>
                <a href="/index/ferris/records.html">{ text.records }</a>
              </div>
            {/* </div> */}
            <div className={`${styles.rows} ${styles.rules}`} onClick={ () => setRules(true) }>{ text.rules }</div>
            <div className={`${styles.rows} ${styles.rank}`}>
              <a href="/index/ferris/rank.html">{ text.rank }</a>
            </div>
          </div>

          { data && <Down
            handleAdd={ (index, chip) => handleAdd(index, chip)}
            handleTips={ () => handleTips()}
            reward={data.reward}
            history={data.history}
            balance={data.balance}
            today={data.today_diamond}
            info={data.info}
            result={result}
            bet={data.bet} /> }

        </div>

        <img className={styles.base} src={base} />
        { showTips && data && result &&
          <Tips
            winner={result.winner}
            reward={data.reward}
            id={result.reward_id} /> }

        { showRules && <Rules rule={data.rule} handleShow={ () => setRules(false) } /> }
      </div>
    </div>
  );
};

export default Index;
