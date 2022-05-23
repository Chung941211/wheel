import { useEffect } from "react";
import { useRequest } from 'ice';
import fscService from '@/services/fscApi';
import text from '@/locales';

import styles from './index.module.css';

import back from '@/assets/back.png';
import diamonds from '@/assets/diamonds.png';
import bi from '@/assets/bi.png';

const Header = (props) => {

  const { index, item } = props;

  return (
    <div className={`${styles.bigPortrait} portrait-${index}`}>
      { item &&
        <div>
          <img className={`${styles.portrait} ${index === 1 ? styles.bimg : ''}`} src={item.user_one.headimgurl} />
          <div className={`${styles.nums} ${styles['nums-' + index]}`}>{index}</div>
          <div className={`${styles.name} ${styles['name-' + index]}`}>
            <span>{ item.user_one.nickname }</span>
            <div className={styles.fraction}>
              <img src={diamonds} />
              <div className={styles.grade}>{ item.total_profit }</div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const Items = (props) => {
  const { item, index, betType } = props;
  return (
    <div className={styles.items}>
      <div className={styles.index}>{ index + 1 }</div>
      <img className={styles.itemHeader} src={item.user_one.headimgurl} />
      <div className={styles.popular}>{ item.user_one.nickname }</div>
      <div className={styles.gold}>
        { betType === '1' ? <img src={diamonds} /> : <img src={bi} /> }
        <div>{ item.total_profit }</div>
      </div>
    </div>
  )
}

const Rank = (props) => {
  const { handleRank, handleReward, betType, roomId } = props;
  const { data: recordsList, request: fetchData } = useRequest(fscService.getRank);

  useEffect(() => {

    fetchData({ betType, roomId });

  }, [ fetchData ])


  return (
    <>
      <div className={styles.bg} onClick={ () => handleRank() } />
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <img className={styles.back} onClick={ () => handleRank() } src={back} />
          <div className={styles.title}>{ text.rank }</div>
          <div className={styles.reward} onClick={ () => handleReward() }>{ text.reward }</div>
        </div>
        { recordsList &&
          <div className={styles.ranking}>
            { <Header item={recordsList[1]} index={2} /> }
            { <Header item={recordsList[0]} index={1} /> }
            { <Header item={recordsList[2]} index={3} /> }
          </div>
        }
        { recordsList && recordsList.map((item, index) => index > 2 && <Items key={index} index={index} item={item} betType={betType} />) }
      </div>
    </>
  );

  ;
};

export default Rank;
