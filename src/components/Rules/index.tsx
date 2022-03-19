import styles from './index.module.css';

const Rules = (props) => {
  const { handleShow, rule } = props;
  console.log(rule)
  return (
    <>
      <div onClick={handleShow} className={styles.props}>
        <div className={styles.title}>Rules</div>
        <div className={styles.word} dangerouslySetInnerHTML={{__html: rule}}>
        </div>
      </div>
      <div onClick={handleShow} className={styles.bg} />
    </>
  )
}

export default Rules;
