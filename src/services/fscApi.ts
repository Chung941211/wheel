import { request } from 'ice';
import { header } from '../utils';

export default {
  //
  async getFsc(params) {
    console.log(params)
    const data = await request({
      url: `/api/fsc/section`,
      params,
      headers: {
        ...header,
        roomId: params.roomId,
        betType: params.betType
      }
    });
    return data.data;
  }
}
