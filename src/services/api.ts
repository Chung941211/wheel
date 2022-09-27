import { request } from 'ice';
import { getSignParams, ApiUrl } from '../utils';

export default {

  async clientLog(log) {
    await request({
      url: `${ApiUrl}/api/common/client_log`,
      data: {
        log: JSON.stringify({
          ...log,
          token: getSignParams().token,
          platform: 'h5'
        })
      },
      method: 'post',
      headers: getSignParams()
    });
  },
  // 获取排行榜TOP3
  async getFerrisTop3() {
    const params = {
      offset: '',
      page: ''
    }
    const data = await request({
      url: `${ApiUrl}/api/ferris/rank_top3`,
      data: params,
      method: 'post',
      headers: getSignParams()
    });
    return data.data;
  },

  // 获取排行榜
  async getRank() {
    const params = {
      offset: '',
      page: ''
    }
    const data = await request({
      url: `${ApiUrl}/api/ferris/rank`,
      data: params,
      method: 'post',
      headers: getSignParams()
    });
    return data.data.rows || [];
  },

  // 获取摩天轮
  async getSection() {
    let { data } = await request({
      url: `${ApiUrl}/api/ferris/section`,
      headers: getSignParams()
    });
    let showTime = data.info.bet_duration - data.info.started_seconds;
    // data.balance = 5001
    data = {
      ...data,
      info: {
        ...data.info,
        showTime: showTime < 0 ? 0 : showTime
      },
      reward: data.reward.map(items => {
        return {
          ...items,
          num: items.bet_diamond
        }
      })
    }
    return data;
  },

  // 获取用户信息
  async getUserData() {
    return await request({ url: `${ApiUrl}/api/get_user_info`,  method: 'post', headers: getSignParams() });
  },

  // // 获取用户信息
  async login() {
    return await request({
        url: `${ApiUrl}/api/login`,
        method: 'post',
        data: {
          phone: '15999951551', //13051032222
          pass: '123456'
        }
    });
  },

  // 开奖记录
  async getRecords() {
    const { data } = await request({ url: `${ApiUrl}/api/ferris/records`,  method: 'post', headers: getSignParams() });
    return data.rows.map(item => {
      return {
        ...item,
        moment_profit: Number(item.moment_profit)
      }
    }) || []
  },

  // 获取中奖情况
  async getActionResult() {
    const { data } = await request({ url: `${ApiUrl}/api/ferris/actionResult`, headers: getSignParams() });
    return data;
  },

  // 下注
  async postFerrisGo(data) {
    const params = { betItem: data };

    const result = await request({ url: `${ApiUrl}/api/ferris/click`,  method: 'post', headers: getSignParams({ betItem: JSON.stringify(data).replace(/[\\]/g,'') }), data: params });
    return result;
  },
}
