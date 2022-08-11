import { useEffect } from "react";
import { useRequest } from 'ice';
import tigerApi from '@/services/tigerApi';

import Seat from './components/Seat';
import Handle from './components/Handle';

import styles from './index.module.css';


const Tiger = () => {
  const { data: section, request: fetchData } = useRequest(tigerApi.getSection);

  useEffect(() => {
    fetchData({ bet_type: 1 });
  }, [ ])


  return (
    <div className={styles.wrapper}>

      <div className={styles.topper}>
        <div className={styles.nums}></div>
        <div className={styles.nums}></div>
      </div>

      { section && <Handle section={section} /> }

      { section && <Seat section={section} /> }

    </div>
  );

  ;
};

export default Tiger;
