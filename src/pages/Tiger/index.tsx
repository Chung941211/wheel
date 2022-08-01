import { useEffect } from "react";
import { useRequest } from 'ice';
import userService from '@/services/api';
import text from '@/locales';

import styles from './index.module.css';

import back from '@/assets/back.png';

const Tiger = () => {
  const { data: recordsList, request: fetchData } = useRequest(userService.getRank);

  useEffect(() => {
    fetchData();
  }, [ fetchData ])


  return (
    <div className={styles.wrapper}>
      1
    </div>
  );

  ;
};

export default Tiger;
