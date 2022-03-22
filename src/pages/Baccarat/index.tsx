import { useEffect } from "react";
import { useRequest } from 'ice';

import fscService from '@/services/fscApi';
import { getQueryVariable } from '@/utils';

import Seat from '@/components/Seat';

import styles from './index.module.css';
import text from '@/locales';

const Baccarat = () => {
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
        <div>{ text.rules }</div>
        <div>{ text.rank }</div>
      </div>

      <Seat />
    </div>
  );
};

export default Baccarat;
