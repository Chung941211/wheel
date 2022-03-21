import Seat from '@/components/Seat';

import styles from './index.module.css';
import text from '@/locales';

const Baccarat = () => {
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
