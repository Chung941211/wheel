import { request } from 'ice';
import { getSignParams,  ApiUrl } from '../utils';

export default {
  async getSection(params) {
    let data = await request({
      url: `${ApiUrl}/api/slot/section`,
      method: 'get',
      params,
      headers: getSignParams()
    });
    let temp = {
      ...data,
      data: {
        ...data.data,
        win_reward: data.data.win_reward.map((item, index) => {
          return {
            ...item,
            tempId: index + 1
          }
        })

      }
    };

    return temp.data;
  },

  // 开奖记录
  async getRecords() {
    const { data } = await request({ url: `${ApiUrl}/api/slot/records`,  method: 'post', headers: getSignParams() });
    return data.rows.map(item => {
      return {
        ...item,
        moment_profit: Number(item.moment_profit)
      }
    }) || []
  }
}
