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
    if (data.code === 0) {
      alert(data.message);
    }
    return data.data;
  },
  // 获取结果
  async getResult(params) {
    const data = await request({
      url: `/api/fsc/actionResult`,
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

  async postClick(params) {
    const { betItem, roomId, betType } = params;
    const data = await request({
      url: `/api/fsc/click`,
      method: 'post',
      data: {
        betItem: betItem
      },
      headers: {
        ...header,
        roomId,
        betType
      }
    });
    return data.data;
  },

  // 禁言
  async postSound(uid) {
    const data = await request({
      url: `/api/is_sound`,
      data: {
        uid
      },
      method: 'post',
      headers: header
    });
    return data;
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
