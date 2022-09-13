import { useEffect, useState } from "react";
import { useRequest } from 'ice';
import useSound from 'use-sound';
import { useWebSocket, useInterval, useUnmount, useDocumentVisibility } from 'ahooks';
import tigerApi from '@/services/tigerApi';

import Seat from './components/Seat';
import Handle from './components/Handle';
import Mainer from './components/Mainer';
import Poups from './components/Poups';

import styles from './index.module.css';
import diamonds from '@/assets/diamonds.png';

// import betMusic from '../../assets/tiger/bet.mp3';

interface RewardType {
  bet_name?: string;
  id: number | string;
  num?: number
}

interface SlotType {
  reward_id: number;
  num: number
}

interface resultType {
  balance: string;
  payout: string | number;
}

let socktUrl = ''
let url = location.hostname.split('.');
if (url[0] === 'release') {
  socktUrl = 'wss://release-socket.biubiuclub.com'
} else if (url[2] === 'com' && url[0] === 'club') {
  socktUrl = 'wss://socket.biubiuclub.com'
} else {
  socktUrl = 'wss://sock.piupiuchat.top'
}
const Tiger = () => {
  const [ activeBets, setActiceBets ] = useState<RewardType>({ id: '' });
  const [ ing, setIng ] = useState<boolean>(false);
  const [ win, setWin ] = useState<number | string>('');
  const [ payout, setPayout ] = useState<string | number>('');
  const [ slot, setSlot ] = useState<SlotType[]>([]);
  const [ balance, setBalance ] = useState<string>('');
  const [ more, setMore ] = useState<object>({});
  const [ resultData, setResultData ] = useState<resultType>({ balance: '', payout: '' });
  const { data: section, request: fetchData } = useRequest(tigerApi.getSection);
  const { latestMessage, readyState, sendMessage, connect, disconnect } = useWebSocket(
    socktUrl, {
      manual: true
    }
  );
  const [ playBtes ] = useSound('https://club.piupiuchat.top/static/home/musics/bet.mp3');
  const [ playIn, { stop } ] = useSound('https://club.piupiuchat.top/static/home/musics/in.mp3');
  const [ playBad ] = useSound('https://club.piupiuchat.top/static/home/musics/bad.mp3');
  const [ playGood ] = useSound('https://club.piupiuchat.top/static/home/musics/good.mp3');
  const documentVisibility = useDocumentVisibility();
  // 心跳
  useInterval(() => {
    sendMessage && sendMessage(`{"action":"HEART","data":[]}`)
    console.log(readyState)
  }, 30000);

  useUnmount(() => {
    disconnect && disconnect();
  });

  useEffect(() => {
    console.log('readyState', readyState, documentVisibility)
    if (!section) {
      return
    }
    if (readyState === 3) {
      connect && connect();
      // setMore({});
      // fetchData({ bet_type: 1 });
    }
  }, [readyState])

  useEffect(() => {
    if (documentVisibility === 'hidden') {
      disconnect && disconnect();
    }
  }, [ documentVisibility ])

  useEffect(() => {
    const fetchApi = async () => {
      await fetchData({ bet_type: 1 });
      connect && connect();
    }
    fetchApi();
    return () => {
      disconnect && disconnect();
    }
  }, []);

  useEffect(() => {
    if (slot.length > 0) {
      let temp = {}
      slot.forEach(element => {
        temp[element.reward_id] = element.num < 999 ? element.num : 999;
      });
      setMore(temp);
    } else {
      setMore({});
    }
  }, [ slot ]);

  useEffect(() => {
    if (section) {
      setBalance(section.balance);
    }
  }, [ section ])

  useEffect(() => {
    if (!latestMessage || !section) {
      return;
    }
    let data = JSON.parse(latestMessage?.data);
    if (!data) {
      return;
    }
    if (data.action === 1002) {
      sendMessage && sendMessage(`{"action":"INIT","data":{"user_id": "${section.user_id}"}}`);
    }
    if (data.action === 1003) {
      sendMessage && sendMessage(`{"action":"LOGIN","data":{"user_id": "${section.user_id}"}}`);
    }
    if (data.action === 2105) {
      handleSolt(data.data); // slot
    }
    if (data.action === 2106) {
      handleResult(data.data); // result
      setIng(true);
      playIn();
    }
    if (data.action === 0) {
      stop();
      setIng(false);
      alert(data.msg)
    }
  }, [ latestMessage ]);

  const handleReset = () => {
    setBalance(resultData.balance);
    setPayout(resultData.payout);
    setSlot([]);
    setIng(false);
  }

  const handleTime = () => {
    stop();
    if (resultData.payout > 0) {
      playGood();
    } else {
      playBad();
    }
  }

  const handleResult = (data) => {
    setResultData(data);
    setTimeout(() => {
      setWin(data.win_reward_id);
    }, 5000)
  }

  const handleSolt = (data) => {
    setBalance(data.balance);
    setSlot(data.bet_info);
  }

  const handleBets = (bets) => {
    setActiceBets(bets);
  }

  const handleDirection = (direction) => {
    playBtes();
    if (more[direction] + activeBets.num >= 999) {
      return
    }
    if (activeBets.id && !ing) {
      setWin('');
      setPayout('');
      sendMessage && sendMessage(`{"action":"GAME_SLOT_BET","data":{"reward_id":"${direction}","bet_id": "${activeBets.id}","bet_type": "1"}}`)
    }
  }

  const handleReward = (id) => {
    playBtes();
    if (more[id] + activeBets.num >= 999) {
      return
    }
    if (activeBets.id && !ing) {
      setWin('');
      setPayout('');
      sendMessage && sendMessage(`{"action":"GAME_SLOT_BET","data":{"reward_id":"${id}","bet_id": "${activeBets.id}","bet_type": "1"}}`)
    }
  }

  const handleOpen = () => {
    if (!ing) {
      sendMessage && sendMessage(`{"action":"GAME_SLOT_OPEN","data": null}`);
    }
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.content}>
        <div className={styles.topper}>
          <div className={`${styles.nums} iconfont`}>{ payout !== '' ? payout : '' }</div>
          <img className={styles.diamonds} src={diamonds} />
          <div className={`${styles.nums} iconfont`}>{ balance !== '' ? balance : '' }</div>
        </div>

        { section && <Poups rule={section.rule} /> }

        <div className={styles.center}>
          { section && <Mainer
            win={win}
            ing={ing}
            handleTime={() => handleTime()}
            handleReset={() => handleReset() }
            section={section} /> }

          <div className={styles.down}>
            <div className={styles.downWrapper}>
              { section && <Seat
                more={more}
                section={section}
                handleReward={ (item) => handleReward(item) } /> }

              { section && <Handle
                section={section}
                more={more}
                handleSetBets={ (bets) => handleBets(bets)}
                handleSetRecords={ (direction) => handleDirection(direction)}
                handleOpen={ () => handleOpen() } /> }
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  ;
};

export default Tiger;
