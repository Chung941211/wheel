import { useEffect, useState } from "react";
import { useInterval } from 'ahooks';

import styles from './index.module.css';
import mainerBg from '@/assets/tiger/mainer.png';

interface RewardType {
  id: number | string;
  show_img: string;
}

const RewardItem = (props) => {
  const { item, active } = props;
  const [ show, setShow ] = useState<boolean>(false);

  useEffect(() => {
    if (active.indexOf(item.id) > -1) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [active])

  return (
    <div
      className={`${styles.item} ${show ? styles.active : ''} ${styles['item-' + item.id]}`}
      key={item.id}>
      <img className={`${styles.reward} ${item.multiple > 0 ? styles.multiple : ''}`} src={item.show_img} />
      { item.multiple > 0 && <div className={styles.nums}>x{ item.multiple }</div> }
    </div>
  )
}

const Mainer = (props) => {
  const { section, win, ing } = props;
  const { win_reward } = section;

  const [ active, setActive ] = useState<number[]>([]);
  const [ topReward, setTop ] = useState<Array<RewardType>>([]);
  const [ leftReward, setLeft ] = useState<Array<RewardType>>([]);
  const [ rightReward, setRight ] = useState<Array<RewardType>>([]);
  const [ bottomReward, setBottom ] = useState<Array<RewardType>>([]);
  const [ interval, setInterval ] = useState<number | undefined>(undefined);

  useInterval(() => {
    let tempArr = [ ...active ];
    let bol = false;
    for (let i = 0; i < tempArr.length; i++) {
      let num = tempArr[i];
      if (num === win) {
        setInterval(undefined);
        bol = true;
        setActive([win, win, win, win])
        break;
      } else if (num + 1 > 24) {
        tempArr[i] = 1;
      } else {
        tempArr[i] = num + 1;
      }
    }
    if (!bol) {
      setActive(tempArr);
    }
  }, interval);

  useEffect(() => {
    if (ing) {
      setInterval(100);
      setActive([1, 2, 3, 4]);
    } else if (!win) {
      setInterval(100);
      setActive([]);
    }
  }, [ing, win])
  // useEffect(() => {
  //   if (!win) {
  //     setActive([1, 2, 3, 4]);
  //   }
  // }, [win])

  useEffect(() => {
    let tempArr = [ ...win_reward ];
    setTop([ ...[ ...tempArr].splice(tempArr.length - 3, tempArr.length), ...[ ...tempArr].splice(0, 4) ])
    setRight([ ...[ ...tempArr ].splice(4, 5)])
    setBottom([ ...[ ...tempArr ].splice(9, 7)].reverse())
    setLeft([ ...[ ...tempArr ].splice(16, 5)].reverse())
  }, [ win_reward ])


  return (
    <div className={styles.wrapper}>
      <div className={styles.mainer}>
        <div className={styles.rows}>
          { topReward.map((item, index) => <RewardItem key={index} active={active} item={item} />) }
        </div>
        <div className={styles.mid}>
          <div className={styles.content}>
            { leftReward.map((item, index) => <RewardItem key={index} active={active} item={item} />) }
          </div>
          <div className={styles.content}>
            { rightReward.map((item, index) => <RewardItem key={index} active={active} item={item} />) }
          </div>
        </div>
        <div className={styles.rows}>
          { bottomReward.map((item, index) => <RewardItem key={index} active={active} item={item} />) }
        </div>
      </div>
      <img className={styles.mainerBg} src={mainerBg}  />
    </div>
  )
}

export default Mainer;
