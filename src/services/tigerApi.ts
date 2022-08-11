import { request } from 'ice';
import { getSignParams } from '../utils';

export default {
  async getSection(params) {
    const data = await request({
      url: `/api/slot/section`,
      method: 'get',
      params,
      headers: getSignParams()
    });
    return data.data;
  },
  // 开始游戏
  async getStart(params) {
    const data = await request({
      url: `/api/fsc/start`,
      headers: {
        ...getSignParams(),
        roomId: params.roomId,
        betType: params.betType
      }
    });
    if (data.code === 0) {
      alert(data.message);
    }
    return data.data;
  }
}
