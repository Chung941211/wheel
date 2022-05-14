import { request } from 'ice';
import { header } from '../utils';

export default {
  async getUserRoom() {
    const data = await request({
      url: `/api/room/userRoom`,
      method: 'post',
      headers: header
    });
    return data.data;
  },
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
  async getFscTop3(params) {
    const data = await request({
      url: `/api/fsc/rank_top3`,
      data: {
        offset: '',
        page: '',
        roomId: params.roomId,
        betType: params.betType
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
  async postAddWaid(params) {
    const { uid } = params;
    const data = await request({
      url: `/api/addWaid`,
      method: 'post',
      data: {
        uid: uid
      },
      headers: { ...header }
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

  // 开麦
  async postRemove(uid) {
    const data = await request({
      url: `/api/remove_sound`,
      data: {
        uid
      },
      method: 'post',
      headers: header
    });
    return data;
  },
  // 赠送金币
  async giftAmount(params) {
    const data = await request({
      url: `/api/fsc/gift_amount`,
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

  // 获取排行榜
  async getRank(params) {
    const data = await request({
      url: `/api/fsc/rank`,
      data: {
        offset: '',
        page: '',
        roomId: params.roomId,
        betType: params.betType
      },
      method: 'post',
      headers: header
    });
    return data.data.rows || [];
  },
  // 开奖记录
  async getRecords(params) {
    const { data } = await request({
      url: `/api/fsc/records`,
      method: 'post',
      headers: header,
      data: {
        roomId: params.roomId,
        betType: params.betType
      }
    });
    return data.rows.map(item => {
      return {
        ...item,
        moment_profit: Number(item.moment_profit)
      }
    }) || []
  }
}
