import { request } from 'ice';
import { getSignParams } from '../utils';

export default {
  async getUserRoom() {
    const data = await request({
      url: `/api/room/userRoom`,
      method: 'post',
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
  },
  // 获取结果
  async getResult(params) {
    const data = await request({
      url: `/api/fsc/actionResult`,
      headers: {
        ...getSignParams(),
        roomId: params.roomId,
        betType: params.betType
      }
    });
    return data.data;
  },
  // 获取排行榜TOP3
  async getFscTop3(params) {
    const query = {
      roomId: params.roomId,
      betType: params.betType
    }
    const data = await request({
      url: `/api/fsc/rank_top3`,
      data: query,
      method: 'post',
      headers: getSignParams(query)
    });
    return data.data;
  },

  async getFsc(params) {
    const data = await request({
      url: `/api/fsc/section`,
      params,
      headers: {
        ...getSignParams(),
        roomId: params.roomId,
        betType: params.betType
      }
    });
    return data.data;
  },
  async postAddWaid(params) {
    const query = { uid: params.uid }
    const data = await request({
      url: `/api/addWaid`,
      method: 'post',
      data: query,
      headers: getSignParams(query)
    });
    return data.data;
  },

  async postClick(params) {
    const { betItem, roomId, betType } = params;
    const query = {
      betItem: betItem
    }
    const data = await request({
      url: `/api/fsc/click`,
      method: 'post',
      data: query,
      headers: {
        ...getSignParams({ betItem: JSON.stringify(betItem).replace(/[\\]/g,'') }),
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
      headers: getSignParams({ uid })
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
      headers: getSignParams({ uid })
    });
    return data;
  },
  // 赠送金币
  async giftAmount(params) {
    const data = await request({
      url: `/api/fsc/gift_amount`,
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
  },

  // 获取排行榜
  async getRank(params) {
    const query = {
      roomId: params.roomId,
      betType: params.betType
    }
    const data = await request({
      url: `/api/fsc/rank`,
      data: query,
      method: 'post',
      headers: getSignParams(query)
    });
    return data.data.rows || [];
  },
  // 开奖记录
  async getRecords(params) {
    const query = {
      roomId: params.roomId,
      betType: params.betType
    }
    const { data } = await request({
      url: `/api/fsc/records`,
      method: 'post',
      headers: getSignParams(query),
      data: query
    });
    return data.rows.map(item => {
      return {
        ...item,
        moment_profit: Number(item.moment_profit)
      }
    }) || []
  }
}
