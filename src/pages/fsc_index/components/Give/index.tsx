import { useEffect, useState } from "react";
import { useRequest } from 'ice';

import text from '@/locales';
import fscService from '@/services/fscApi';
import { getQueryVariable } from '@/utils';
import btn from '@/assets/btn.png';
import styles from './index.module.css';


// is_gift_gold_beans=1 && gift_gold_beans_count>0 && gift_gold_beans_num>0 && user_gift_num<gift_gold_beans_count

const Give = (props) => {
  const { request: giftAmount } = useRequest(fscService.giftAmount);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ showGive, setShowGive ] = useState<boolean>(false);
  const { fscData, roomId } = props;
  const { gift_gold_beans_count, gift_gold_beans_num, is_gift_gold_beans, user_gift_num } = fscData.rule_config;

  useEffect(() => {
    if (!fscData) {
      return;
    }
    if (
      is_gift_gold_beans === 1 &&
      Number(gift_gold_beans_count) > 0 &&
      Number(gift_gold_beans_num) > 0 &&
      user_gift_num < Number(gift_gold_beans_count)
    ) {
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
            <div className={styles.word}>您身上的金币已不足，系统第一次（每天{gift_gold_beans_count}次）免费送您{gift_gold_beans_num}金币。</div>
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
