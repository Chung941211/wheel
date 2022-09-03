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

  // 开奖记录
  async getRecords() {
    const { data } = await request({ url: `/api/slot/records`,  method: 'post', headers: getSignParams() });
    return data.rows.map(item => {
      return {
        ...item,
        moment_profit: Number(item.moment_profit)
      }
    }) || []
  }
}
