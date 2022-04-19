import { useEffect, useState } from "react";
import { useRequest } from 'ice';

import text from '@/locales';
import fscService from '@/services/fscApi';
import { getQueryVariable } from '@/utils';
import btn from '@/assets/btn.png';
import styles from './index.module.css';

const Give = (props) => {
  const { request: giftAmount } = useRequest(fscService.giftAmount);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ showGive, setShowGive ] = useState<boolean>(false);
  const { fscData, roomId } = props;
  const { gift_gold_beans_count, gift_gold_beans_num, is_gift_gold_coin } = fscData.rule_config;

  useEffect(() => {
    if (!fscData) {
      return;
    }
    if (is_gift_gold_coin === 1) {
      setShowGive(true);
    }

  }, [fscData]);

  const handleGive = async () => {
    let betType:string | boolean = getQueryVariable('betType');
    setLoading(true);
    await giftAmount({ roomId, betType });
    setTimeout(() => {
      setLoading(false);
    }, 1100);
  }

  return (
    <>
      { showGive && !loading &&
        <div className={styles.props}>
          <div className={styles.content}>
            <div className={styles.word}>{ text.give1 } { gift_gold_beans_num } { text.give2 } {gift_gold_beans_count} { text.give3 }</div>
            <div className={styles.btn} onClick={ () => handleGive() }>
              <img src={btn} />
            </div>
          </div>
          <div className={styles.bg} />
        </div>
      }
    </>
  )
}

export default Give;
