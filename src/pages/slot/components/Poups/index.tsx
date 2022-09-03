import { useState } from "react";
import text from '@/locales';
import styles from './index.module.css';
import Records from '../Records';
import tigerApi from '@/services/tigerApi';
import { useRequest } from 'ice';

const Poups = (props) => {

  const { rule } = props;
  const [ showRules, setRules ] = useState<boolean>(false);
  const [ showRecords, setRecords ] = useState<boolean>(false);
  const { data: recordsList, request: fetchData } = useRequest(tigerApi.getRecords);

  const handleRecord = () => {
    const fetchApi = async () => {
      await fetchData();
      setRecords(true);
    }
    fetchApi();
  }
  return (
    <>
      <div className={styles.btn}>
        <div className={styles.rules} onClick={() => setRules(true)}>{ text.rules }</div>
        <div className={styles.records} onClick={() => handleRecord() }>Records</div>
      </div>
      { showRules && <div>
          <div onClick={() => setRules(false)} className={styles.props}>
            <div className={styles.title}>{ text.rules }</div>
            <div className={styles.word} dangerouslySetInnerHTML={{__html: rule}}>
            </div>
          </div>
          <div onClick={() => setRules(false)} className={styles.bg} />
        </div>
      }
      { showRecords && <Records recordsList={recordsList} handleRecords={ () => setRecords(false)} /> }
    </>
  )
}

export default Poups;
