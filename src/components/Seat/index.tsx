import styles from './index.module.css';

const Seat = (props) => {

  return (
    <div onClick={props.handleShow} className={styles.props}>
      1
    </div>
  )
}

export default Seat;
