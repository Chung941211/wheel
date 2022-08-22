import { useEffect, useState } from "react";
import { useRequest } from 'ice';
import { useWebSocket, useInterval } from 'ahooks';
import tigerApi from '@/services/tigerApi';

import Seat from './components/Seat';
import Handle from './components/Handle';
import Mainer from './components/Mainer';

import styles from './index.module.css';
import diamonds from '@/assets/diamonds.png';

interface RewardType {
  bet_name?: string;
  id?: number;
  num?: number
}

interface SlotType {
  reward_id: number;
  num: number
}

interface resultType {
  balance: string;
  payout: string
}

const Tiger = () => {
  const [ activeBets, setActiceBets ] = useState<RewardType>({});
  const [ ing, setIng ] = useState<boolean>(false);
  const [ win, setWin ] = useState<number | string>('');
  const [ payout, setPayout ] = useState<string | number>('');
  const [ slot, setSlot ] = useState<SlotType[]>([]);
  const [ balance, setBalance ] = useState<string>('');
  const [ more, setMore ] = useState<object>({});
  const [ resultData, setResultData ] = useState<resultType>({ balance: '', payout: '' });
  const { data: section, request: fetchData } = useRequest(tigerApi.getSection);
  const { latestMessage, readyState, sendMessage, connect, disconnect } = useWebSocket(
    'wss://sock.piupiuchat.top', {
      manual: true,
      onClose: (e) => {
        connect && connect();
      },
      onError: (e) => {
        connect && connect();
      }
    }
  );

  // 心跳
  useInterval(() => {
    sendMessage && sendMessage(`{"action":"HEART","data":[]}`)
  }, 20000);

  useEffect(() => {
    console.log(readyState)
  }, [readyState])

  useEffect(() => {
    const fetchApi = async () => {
      await fetchData({ bet_type: 1 });
      connect && connect();
    }
    fetchApi();
  }, []);

  useEffect(() => {
    if (slot.length > 0) {
      let temp = {}
      slot.forEach(element => {
        temp[element.reward_id] = element.num;
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
      setIng(true);
      handleResult(data.data); // result
    }
  }, [ latestMessage ]);

  const handleReset = () => {
    setBalance(resultData.balance);
    setPayout(resultData.payout);
    setSlot([]);
    setIng(false);
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
    if (activeBets.id && !ing) {
      setWin('');
      setPayout('');
      sendMessage && sendMessage(`{"action":"GAME_SLOT_BET","data":{"reward_id":"${direction}","bet_id": "${activeBets.id}","bet_type": "1"}}`)
    }
  }

  const handleReward = (item) => {
    if (activeBets.id && !ing) {
      setWin('');
      setPayout('');
      sendMessage && sendMessage(`{"action":"GAME_SLOT_BET","data":{"reward_id":"${item.id}","bet_id": "${activeBets.id}","bet_type": "1"}}`)
    }
  }

  const handleOpen = () => {
    if (!ing) {
      sendMessage && sendMessage(`{"action":"GAME_SLOT_OPEN","data": null}`);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topper}>
        <div className={`${styles.nums} ${payout !== '' ? styles.numsIn : ''} `}>{ payout !== '' ? payout : '' }</div>
        <img className={styles.diamonds} src={diamonds} />
        <div className={`${styles.nums} ${balance !== '' ? styles.numsIn : ''} `}>{ balance !== '' ? balance : '' }</div>
      </div>

      <div className={styles.center}>
        { section && <Mainer
          win={win}
          ing={ing}
          handleReset={() => handleReset() }
          section={section} /> }

        <div className={styles.down}>
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
  );

  ;
};

export default Tiger;
