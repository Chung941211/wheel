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

const Baccarat = () => {
  const [ showRules, setRules ] = useState<boolean>(false);
  const [ showReward, setReward ] = useState<boolean>(false);
  const [ showRecords, setRecords ] = useState<boolean>(false);
  const [ showRank, setRank ] = useState<boolean>(false);
  const { data: fscData, request: getFsc } = useRequest(fscService.getFsc);

  useEffect(() => {
    let roomId:string | boolean = getQueryVariable('roomId');
    let betType:string | boolean = getQueryVariable('betType');

    getFsc({ roomId, betType });

  }, []);
  return (

    <div className={styles.main}>
      <div className={styles.nav}>
        <div>{ text.records }</div>
        <div onClick={ () => setRules(true) }>{ text.rules }</div>
        <div onClick={ () => setRank(true) }>{ text.rank }</div>
      </div>

      <Disc />

      { fscData && <Mainer fscData={fscData} /> }

      <Seat />

      { fscData && showRules && <Rules rule={fscData.rule} handleShow={ () => setRules(false) } /> }

      { !showRecords && <Records handleRecords={ () => setRecords(false)} /> }

      { showReward && <Reward handleReward={ () => setReward(false)  } /> }

      { showRank && !showReward && <Rank handleReward={ () => setReward(true)  } handleRank={ () => setRank(false) } /> }

    </div>
  );
};

export default Baccarat;
