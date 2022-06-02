import { useEffect, useState } from "react";
import { useInterval } from 'ahooks';
import { useRequest } from 'ice';

import fscService from '@/services/fscApi';
import { getQueryVariable } from '@/utils';

import Seat from './components/Seat';
import Disc from './components/Disc';
import Mainer from './components/Mainer';
import Rules from './components/Rules';
import Reward from './components/Reward';
import Rank from './components/Rank';
import Records from './components/Records';
import Tips from './components/Tips';
import Give from './components/Give';

import styles from './index.module.css';
import text from '@/locales';
import diamonds from '@/assets/diamonds.png';
import bi from '@/assets/bi.png';
import close from '@/assets/close.png';

type betItemType = {
  rewardId: string
  betId: number
  betMany: number
}

const Baccarat = () => {
  const [ showRules, setRules ] = useState<boolean>(false);
  const [ showReward, setReward ] = useState<boolean>(false);
  const [ showRecords, setRecords ] = useState<boolean>(false);
  const [ showTips, setTips ] = useState<boolean>(false);
  const [ showRank, setRank ] = useState<boolean>(false);
  const [ chip, setChip ] = useState<number | string>('');
  const [ roomId, setRoomId ] = useState<string>('');
  const [ uid, setUid ] = useState<string>('');
  const [ recordBol, setRecordBol ] = useState<boolean>(false);
  const { data: roomData, request: getRoom } = useRequest(fscService.getUserRoom);
  const { request: postClick } = useRequest(fscService.postClick);
  const { data: result, request: getResult, mutate: resetResult } = useRequest(fscService.getResult);
  const { data: fscData, request: getFsc } = useRequest(fscService.getFsc, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  });
  const [ mic, setMic ] = useState<object[]>([]);
  const [ own, setOwn ] = useState<number | string>('');
  const [ betItem, setBetItem ] = useState<betItemType[]>([]);
  let betType:string | boolean = getQueryVariable('betType');

  useEffect(() => {
    document.title = text.fscTitle;
    const fetchData = async () => {
      let room = await getRoom();
      setRoomId(room.id);
      setUid(room.uid);
      let data = await getFsc({ roomId: room.id, betType });
      handleResult(data);
    };

    fetchData();

  }, []);

  useEffect(() => {
    if (betItem.length > 0) {
      postClick({ roomId, betType, betItem })
    }
  }, [ betItem ]);

  useInterval(() => {
    const { stage_status } = fscData.info;
    if (stage_status === 4 && (!result || (result && result.reward_id === ''))) {
      getResult({ roomId, betType });
    }
    if (stage_status !== 4 && stage_status !== 5) {
      resetResult(null);
    }
    if (stage_status === 5 || stage_status === 2) {
      handleResult(fscData);
    }
  }, 2000);

  const handleResult = (data) => {
    let seatArr:Array<object> = [];
    for (let i = 0; i < 12; i++) {
      seatArr.push({
        ball: [],
        id: i
      });
    }
    data.user_mic_serial.forEach(ele => {
      if (ele.is_own === 1) {
        setOwn(ele.position);
      }
      seatArr[ele.position] = {
        ...ele,
        ...seatArr[ele.position],
        id: ele.position
      }
    });
    setMic([ ...seatArr ]);
  }

  const handleChip = (index: number) => {
    if (chip === index) {
      setChip('');
    } else {
      setChip(index);
    }
  }


  const handleBall = (key: number, two:number[], seat: number | string, betSring?: number) => {
    let betChip: number | string = betSring ? betSring : chip;
    if (betChip === '' || fscData.info.stage_status !== 3) {
      return;
    }
    if (two.length === 2 && two.indexOf(key) < 0) {
      return;
    }
    const current:HTMLElement = document.getElementById(`reward-${key}`) as HTMLElement;
    const set:HTMLElement = document.getElementById(`seat-${seat}`) as HTMLElement;
    const parent:HTMLElement = document.getElementById(`reward`) as HTMLElement;
    let eleLeft: number = 0;
    const leftPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);
    const topPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);

    if (seat < 7) {
      eleLeft = current.offsetLeft + parent.offsetLeft + leftPos + set.offsetLeft;
    } else {
      eleLeft = (leftPos + set.offsetLeft - current.offsetLeft - parent.offsetLeft - 20) * -1;
    }
    const eleTop = current.offsetTop + topPos + 195 - set.offsetTop
    let ballPos = {
      left: `${eleLeft}px`,
      top: `${eleTop}px`,
      active: betChip,
      diamond: fscData.bet[betChip].diamond
    }
    let temp = mic;
    // let tempNum = num + fscData.bet[betChip].diamond;
    let deduction = temp[seat].user_info.balance - fscData.bet[betChip].diamond;
    if (deduction >= 0) {
      temp[seat].user_info.balance = deduction;
      temp[seat].ball.push(ballPos);
      setMic([ ...temp ]);
    }
    if (!betSring) {
      // setNum(tempNum);
      setBetItem([{
        rewardId: two.length === 2 ? `${fscData.reward[two[0]].id},${fscData.reward[two[1]].id}` : fscData.reward[key].id.toString(),
        betId: fscData.bet[betChip].id,
        betMany: two.length === 2 ? 2 : 1
      }])
    }
  }

  const handleClose = () => {
    if (window.BiubiuClub) {
      window.BiubiuClub.callback("close_room", JSON.stringify({uid: uid}));
    }
    if (window.webkit) {
      window.webkit.messageHandlers.close_room.postMessage(JSON.stringify({uid: uid}));
    }
  }

  const handleRecords = () => {
    if (recordBol) {
      setRecordBol(false)
    }
  }

  return (

    <div className={styles.main} onClick={ () => handleRecords() } >
      <div className={styles.content}>
        <div className={styles.nav}>
          <div className={styles.leftNav}>
            <div onClick={ () => setRecords(true) }>{ text.records }</div>
            <div onClick={ () => setRules(true) }>{ text.rules }</div>
            <div onClick={ () => setRank(true) }>{ text.rank }</div>
          </div>
          <div className={styles.close}>
            <img onClick={ () => handleClose() } src={close} />
          </div>
          { roomData && <div className={styles.room}>ID{recordBol}：{ roomData.numid }
            { betType === '1' ? <img src={diamonds} /> : <img src={bi} /> }
            </div>
          }
        </div>


        { fscData && <Disc info={fscData.info} history={fscData.history} result={result}  /> }

        { fscData &&
          <Mainer
          fscData={fscData}
          chip={chip}
          result={result}
          own={own}
          mic={mic}
          uid={uid}
          roomId={roomId}
          handleTips={ () => setTips(true) }
          handleBall={ (reward, two, seatIndex, betIndex) => handleBall(reward, two, seatIndex, betIndex) }
          handleChip={ (index) => handleChip(index) } /> }

        { fscData && mic.length > 0 &&
          <Seat
            uid={uid}
            result={result}
            mic={mic}
            fscData={fscData}
            recordBol={recordBol}
            handleInfo={ () => { setRecordBol(true) }} /> }


      </div>

      { showTips && fscData && <Tips fscData={ fscData } handleShow={ () => setTips(false)  } /> }

      { showRecords && <Records betType={betType} roomId={roomId} handleRecords={ () => setRecords(false)} /> }

      { showReward && <Reward betType={betType} roomId={roomId} handleReward={ () => setReward(false)  } /> }

      { showRank && !showReward && <Rank betType={betType} roomId={roomId} handleReward={ () => setReward(true)  } handleRank={ () => setRank(false) } /> }

      { fscData && <Give fscData={fscData} roomId={roomId} /> }

      { fscData && showRules && <Rules rule={fscData.rule} handleShow={ () => setRules(false) } /> }

    </div>
  );
};

export default Baccarat;
