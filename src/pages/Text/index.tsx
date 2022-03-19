import { useEffect } from "react";
import { useRequest } from 'ice';
import userService from '@/services/api';

const Records = () => {
  const { data: phoneData, request: phoneRequest } = useRequest(userService.login);
  const { data: loginData, request: getUserData } = useRequest(userService.getUserData);
  // const { data: userData, loading, request } = useRequest(userService.getUser);
  const { data, request: rank } = useRequest(userService.getRank);

  useEffect(() => {
    const arr: Array<number> = [];

    for (let i:number = 0; i < 10; i++) {
      arr.push(i)
    }
    const fetchData = async () => {
      await phoneRequest();
      await getUserData();
      // await request();
      await rank();
    };


    fetchData();

  }, []);
  console.log(phoneData)
  console.log(loginData)
  // console.log(userData);
  // console.log(loading)

  const handleAdd = (index: number, chip: number, operation:boolean = true) => {
    const temp = data;
    const num:number = data.bet[chip].diamond;
    if (operation && temp.balance - num >= 0) {
      temp.reward[index].num += num;
      // setHistory([ ...history, { index, chip }]);
      temp.balance -= num;
    } else if (history.length > 0 && !operation) {
      temp.reward[index].num -= num;
      temp.balance += num;
    }
    let sort:Array<number> = [];
    data.reward.forEach(element => {
      if (sort.indexOf(element.num) > -1) {
        return
      }
      sort.push(element.num);
    });
    if (sort.length === 2) {
      sort.push(0)
    }
    sort.sort((a, b) => a - b);
    sort = sort.slice(-3);
    data.reward.forEach((ele, index) => {
      if (ele.num !== 0 && sort.lastIndexOf(ele.num) > -1) {
        temp.reward[index].max_num = sort.lastIndexOf(ele.num) + 1;
      } else {
        temp.reward[index].max_num = 0;
      }
    });
    // mutate(temp);
    // handleGo(temp.reward[index].id, data.bet[chip].id);
  }


  const handleReset = () => {
    const list = history;
    if (list.length > 0) {
      let ops =  history[history.length - 1];
      handleAdd(ops.index, ops.chip, false);
      // setHistory(list.slice(0, list.length - 1));
    }
  }


  return (
    <div>
      1
    </div>
  );

  ;
};

export default Records;
