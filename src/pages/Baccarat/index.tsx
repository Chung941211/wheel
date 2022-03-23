import { useEffect, useState } from "react";
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

import styles from './index.module.css';
import text from '@/locales';

type ballType = {
  top: string
  left: string,
  active: number | string,
  diamond: number
}

const Baccarat = () => {
  const [ showRules, setRules ] = useState<boolean>(false);
  const [ showReward, setReward ] = useState<boolean>(false);
  const [ showRecords, setRecords ] = useState<boolean>(false);
  const [ showRank, setRank ] = useState<boolean>(false);
  const [ ball, setBall ] = useState<ballType[]>([]);
  const [ chip, setChip ] = useState<number | string>('');
  const { data: fscData, request: getFsc } = useRequest(fscService.getFsc);
  const { request: getStart } = useRequest(fscService.getStart);

  useEffect(() => {
    let roomId:string | boolean = getQueryVariable('roomId');
    let betType:string | boolean = getQueryVariable('betType');

    const fetchData = async () => {
      await getStart({ roomId, betType });
      await getFsc({ roomId, betType });
    };

    fetchData();

  }, []);

  const handleChip = (index: number) => {
    if (chip === index) {
      setChip('');
    } else {
      setChip(index);
    }
  }


  const handleBall = (dom: string) => {
    if (chip === '') {
      return;
    }
    const current:HTMLElement = document.getElementById(dom) as HTMLElement;
    const set:HTMLElement = document.getElementById('seat-8') as HTMLElement;
    const leftPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);
    const topPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);
    const eleLeft = current.offsetLeft + 12 + leftPos + set.offsetLeft
    const eleTop = current.offsetTop + topPos + 250 - set.offsetTop
    let ballPos = {
      left: `${eleLeft}px`,
      top: `${eleTop}px`,
      active: chip,
      diamond: fscData.bet[chip].diamond
    }
    setBall([
      ...ball,
      ballPos
    ]);
  }
  return (

    <div className={styles.main}>
      <div className={styles.nav}>
        <div onClick={ () => setRecords(true) }>{ text.records }</div>
        <div onClick={ () => setRules(true) }>{ text.rules }</div>
        <div onClick={ () => setRank(true) }>{ text.rank }</div>
      </div>

      <Disc />

      { fscData &&
        <Mainer
        fscData={fscData}
        chip={chip}
        handleBall={ (dom) => handleBall(dom) }
        handleChip={ (index) => handleChip(index) } /> }

      <Seat ball={ball} />

      { fscData && showRules && <Rules rule={fscData.rule} handleShow={ () => setRules(false) } /> }

      { showRecords && <Records handleRecords={ () => setRecords(false)} /> }

      { showReward && <Reward handleReward={ () => setReward(false)  } /> }

      { showRank && !showReward && <Rank handleReward={ () => setReward(true)  } handleRank={ () => setRank(false) } /> }

    </div>
  );
};

export default Baccarat;
