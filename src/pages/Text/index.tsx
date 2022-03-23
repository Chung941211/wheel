import React, { useRef, useState } from 'react';
import { useRequest } from 'ice';
import userService from '@/services/api';
import { getQueryVariable } from '@/utils';
import fscService from '@/services/fscApi';
import styles from './index.module.css';
import { useMouse } from 'ahooks';


type ballType = {

  top: string

  left: string

}

const Ball = (props) => {
  const { content } = props;
  const mystyles = {
    '--top': content.top,
    '--left': content.left,
  } as React.CSSProperties;

  return (
    <div className={styles.rows} style={mystyles}></div>
  )
}

const Text = () => {
  const one:any = useRef();
  const two:any = useRef();
  const three:any = useRef();
  const four:any = useRef();
  const five:any = useRef();
  const six:any = useRef();

  const [ ball, setBall ] = useState<ballType[]>([]);
  const handleBall = (dom) => {
    console.log(dom.current)
    const leftPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 60);
    const topPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 60);
    const eleLeft = dom.current.offsetLeft + 65 + leftPos
    const eleTop = dom.current.offsetTop + 65 + topPos
    let ballPos = {
      left: `${eleLeft}px`,
      top: `${eleTop}px`
    }
    setBall([
      ...ball,
      ballPos
    ])

  }
  // const { data: phoneData, request: phoneRequest } = useRequest(userService.login);
  // useEffect(() => {
  //   const arr: Array<number> = [];
  //   let roomId:string | boolean = getQueryVariable('roomId');
  //   let betType:string | boolean = getQueryVariable('betType');

  //   for (let i:number = 0; i < 10; i++) {
  //     arr.push(i)
  //   }
  //   const fetchData = async () => {
  //     // await phoneRequest();
  //     console.log(request)
  //     await request({ roomId, betType });
  //   };
  //   fetchData();
  // }, []);
  return (
    <div className={styles.contents}>
      <div className={styles.test} >trst
        { ball.map((item, index) => <Ball key={index} content={item}  /> ) }
      </div>
      <div className={styles.mainer}>
        <div id="rows-1" ref={one} onClick={ () => handleBall(one) } className={styles.mainerRows}>1</div>
        <div id="rows-2" ref={two} onClick={ () => handleBall(two) } className={styles.mainerRows}>2</div>
        <div id="rows-3" ref={three} onClick={ () => handleBall(three) } className={styles.mainerRows}>3</div>
        <div id="rows-4" ref={four} onClick={ () => handleBall(four) } className={styles.mainerRows}>4</div>
        <div id="rows-5" ref={five} onClick={ () => handleBall(five) } className={styles.mainerRows}>5</div>
        <div id="rows-6" ref={six} onClick={ () => handleBall(six) } className={styles.mainerRows}>6</div>
      </div>
    </div>
  );

  ;
};

export default Text;
