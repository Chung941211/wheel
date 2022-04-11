import text from '@/locales';
import styles from './index.module.css';

const Rules = (props) => {
  const { handleShow, fscData } = props;

  const getBet = (betId: string) => {
    console.log(betId);
    return 30
  }

  return (
    <>
      <div onClick={handleShow} className={styles.props}>
        <div className={styles.title}>我的名字</div>
        <div className={styles.list}>
          { fscData.bet_records.map((item, index) => {
            return (
                <div key={index} className={styles.rows}>
                  <div className={styles.left}>{ item.type }</div>
                  <div className={styles.mian}>单门</div>
                  <div className={styles.right}>{ getBet(item.bet_id) }</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div onClick={handleShow} className={styles.bg} />
    </>
  )
}

export default Rules;
