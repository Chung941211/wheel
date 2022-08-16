import { useEffect, useState } from "react";
import { useRequest } from 'ice';
import { useWebSocket, useInterval } from 'ahooks';
import tigerApi from '@/services/tigerApi';

import Seat from './components/Seat';
import Handle from './components/Handle';
import Mainer from './components/Mainer';

import styles from './index.module.css';


interface RewardType {
  bet_name?: string;
  id?: number;
  num?: number
}

interface SlotType {
  reward_id: number;
  num: number
}

const Tiger = () => {
  const [ activeBets, setActiceBets ] = useState<RewardType>({});
  const [ ing, setIng ] = useState<boolean>(false);
  const [ win, setWin ] = useState<number | string>('');
  const [ payout, setPayout ] = useState<string | number>('');
  const [ slot, setSlot ] = useState<SlotType[]>([]);
  const [ balance, setBalance ] = useState<number>(0);
  const [ more, setMore ] = useState<object>({});
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
      handleResult(data.data); // result
    }
  }, [ latestMessage ]);

  const handleResult = (data) => {
    setTimeout(() => {
      setBalance(data.balance);
      setPayout(data.payout);
      setWin(data.win_reward_id);
      setSlot([]);
      setIng(false);
    }, 5000);
  }

  const handleSolt = (data) => {
    setBalance(data.balance);
    setSlot(data.bet_info);
  }

  const handleBets = (bets) => {
    setActiceBets(bets);
  }

  const handleDirection = (direction) => {
    if (activeBets.id) {
      setWin('');
      setPayout('');
      sendMessage && sendMessage(`{"action":"GAME_SLOT_BET","data":{"reward_id":"${direction}","bet_id": "${activeBets.id}","bet_type": "1"}}`)
    }
  }

  const handleReward = (item) => {
    if (activeBets.id) {
      setWin('');
      setPayout('');
      sendMessage && sendMessage(`{"action":"GAME_SLOT_BET","data":{"reward_id":"${item.id}","bet_id": "${activeBets.id}","bet_type": "1"}}`)
    }
  }

  const handleOpen = () => {
    if (!ing) {
      setIng(true);
      sendMessage && sendMessage(`{"action":"GAME_SLOT_OPEN","data": null}`);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topper}>
        <div className={styles.nums}>{ payout !== '' ? payout : '' }</div>
        <div className={styles.nums}>{ balance > 0 ? balance : '' }</div>
      </div>

      { section && <Mainer
        win={win}
        ing={ing}
        section={section} /> }

      { section && <Handle
       section={section}
       more={more}
       handleSetBets={ (bets) => handleBets(bets)}
       handleSetRecords={ (direction) => handleDirection(direction)}
       handleOpen={ () => handleOpen() } /> }

      { section && <Seat
        more={more}
        section={section}
        handleReward={ (item) => handleReward(item) } /> }

    </div>
  );

  ;
};

export default Tiger;
