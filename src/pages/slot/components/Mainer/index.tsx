import { useEffect, useState } from "react";
import { useInterval } from 'ahooks';

import styles from './index.module.css';
import mainerBg from '@/assets/tiger/mainer.png';

interface RewardType {
  id: number | string;
  show_img: string;
}

const RewardItem = (props) => {
  const { item, active, music } = props;
  const [ show, setShow ] = useState<boolean>(false);
  useEffect(() => {
    if (music && active[3] === item.tempId) {
      return setShow(true)
    } else if (music) {
      return setShow(false)
    }
    if (active.indexOf(item.tempId) > -1) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [active])

  return (
    <div
      className={`${styles.item} ${show ? styles.active : ''} ${styles['item-' + item.tempId]}`}
      key={item.tempId}>
      <img className={`${styles.reward}`} src={item.show_img} />
      {/* { item.multiple > 0 && <div className={styles.nums}>x{ item.multiple }</div> } */}
    </div>
  )
}

const Mainer = (props) => {
  const { section, win, ing, handleReset, handleTime } = props;
  const { win_reward } = section;

  const [ active, setActive ] = useState<number[]>([]);
  const [ topReward, setTop ] = useState<Array<RewardType>>([]);
  const [ leftReward, setLeft ] = useState<Array<RewardType>>([]);
  const [ rightReward, setRight ] = useState<Array<RewardType>>([]);
  const [ bottomReward, setBottom ] = useState<Array<RewardType>>([]);
  const [ interval, setInterval ] = useState<number | undefined>(undefined);
  const [ twinkling, setTwinkling ] = useState<boolean>(false);
  const [ music, setMusic ] = useState<boolean>(false);

  useInterval(() => {
    let tempArr = [ ...active ];
    let winArr:number[] = [];
    let bol = false;
    let temp = interval || 10;
    for (let i = 0; i < tempArr.length; i++) {
      let num = tempArr[i];
      if (num === win && music) {
        winArr.push(num)
      } else if (num + 1 > 24) {
        tempArr[i] = 1;
      } else {
        tempArr[i] = num + 1;
      }
    }

    handleMusic();

    if (winArr.length >= 4) {
      setActive(winArr);
      setInterval(undefined);
      handleReset();
      setTwinkling(true);
      bol = true;
    } else {
      setTwinkling(false);
    }

    if (!bol && winArr.length < 4) {
      setInterval(temp + 1.5);
      setActive(tempArr);
    }
  }, interval);

  useEffect(() => {
    if (!win) {
      setInterval(1);
      setActive([]);
    }
  }, [win])

  useEffect(() => {
    if (ing && active.length === 0) {
      setInterval(1);
      setActive([1, 2, 3, 4]);
      setMusic(false)
    }
  }, [ing])

  useEffect(() => {
    let tempArr = [ ...win_reward ];
    setTop([ ...[ ...tempArr].splice(tempArr.length - 3, tempArr.length), ...[ ...tempArr].splice(0, 4) ])
    setRight([ ...[ ...tempArr ].splice(4, 5)])
    setBottom([ ...[ ...tempArr ].splice(9, 7)].reverse())
    setLeft([ ...[ ...tempArr ].splice(16, 5)].reverse())
  }, [ win_reward ])

  const handleMusic = () => {
    let num = active[3]
    if (!music && win > 6 && num === (win - 5)) {
      setMusic(true)
      handleTime();
    } else if (!music && win > 0 && win <= 6 && num > (17 - -win)) {
      setMusic(true)
      handleTime();
    }

  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.mainer} ${twinkling ? styles.interval : ''} `}>
        <div className={styles.rows}>
          { topReward.map((item, index) => <RewardItem key={index} music={music} active={active} item={item} />) }
        </div>
        <div className={styles.mid}>
          <div className={styles.content}>
            { leftReward.map((item, index) => <RewardItem key={index} music={music} active={active} item={item} />) }
          </div>
          <div className={styles.content}>
            { rightReward.map((item, index) => <RewardItem key={index} music={music} active={active} item={item} />) }
          </div>
        </div>
        <div className={styles.rows}>
          { bottomReward.map((item, index) => <RewardItem key={index} music={music} active={active} item={item} />) }
        </div>
      </div>
      <img className={styles.mainerBg} src={mainerBg}  />
    </div>
  )
}

export default Mainer;
