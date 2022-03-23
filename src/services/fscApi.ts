import { request } from 'ice';
import { header } from '../utils';

export default {
  // 开始游戏
  async getStart(params) {
    const data = await request({
      url: `/api/fsc/start`,
      headers: {
        ...header,
        roomId: params.roomId,
        betType: params.betType
      }
    });
    return data.data;
  },
  // 获取排行榜TOP3
  async getFscTop3() {
    const data = await request({
      url: `/api/fsc/rank_top3`,
      data: {
        offset: '',
        page: ''
      },
      method: 'post',
      headers: header
    });
    return data.data;
  },

  async getFsc(params) {
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
  },

  // 获取排行榜
  async getRank() {
    const data = await request({
      url: `/api/fsc/rank`,
      data: {
        offset: '',
        page: ''
      },
      method: 'post',
      headers: header
    });
    return data.data.rows || [];
  },
  // 开奖记录
  async getRecords() {
    const { data } = await request({ url: `/api/fsc/records`,  method: 'post', headers: header });
    return data.rows.map(item => {
      return {
        ...item,
        moment_profit: Number(item.moment_profit)
      }
    }) || []
  }
}
