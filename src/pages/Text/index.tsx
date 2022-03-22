import { useEffect } from "react";
import { useRequest } from 'ice';
import userService from '@/services/api';
import { getQueryVariable } from '@/utils';
import fscService from '@/services/fscApi';

const Records = () => {
  // const { data: phoneData, request: phoneRequest } = useRequest(userService.login);
  const { data: fscData, request } = useRequest(fscService.getFsc);


  useEffect(() => {
    const arr: Array<number> = [];
    let roomId:string | boolean = getQueryVariable('roomId');
    let betType:string | boolean = getQueryVariable('betType');

    for (let i:number = 0; i < 10; i++) {
      arr.push(i)
    }
    const fetchData = async () => {
      // await phoneRequest();
      console.log(request)
      await request({ roomId, betType });
    };

    fetchData();

  }, []);
  // console.log(phoneData)
  console.log(fscData)
  // console.log(userData);
  // console.log(loading)



  return (
    <div>
      test
    </div>
  );

  ;
};

export default Records;
