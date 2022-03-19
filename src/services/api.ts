import { request } from 'ice';
import { getCookie } from '../utils';


type historyType = {

  token?: string

  'Accept-Language'?: string

}

let header:historyType = {}

if (getCookie("biubiuclub_cookiehttp_token")) {
  // header['token'] = getCookie("biubiuclub_cookiehttp_token");
}

if (getCookie("biubiuclub_cookieaccept_language")) {
  header['Accept-Language'] = getCookie("biubiuclub_cookieaccept_language");
}



export default {

  // 获取排行榜TOP3
  async getFerrisTop3() {
    const data = await request({
      url: `/api/ferris/rank_top3`,
      data: {
        offset: '',
        page: ''
      },
      method: 'post',
      headers: header
    });
    return data.data;
  },

  // 获取排行榜
  async getRank() {
    const data = await request({
      url: `/api/ferris/rank`,
      data: {
        offset: '',
        page: ''
      },
      method: 'post',
      headers: header
    });
    return data.data.rows || [];
  },

  // 获取摩天轮
  async getSection() {
    let { data } = await request({
      url: '/api/ferris/section',
      headers: header
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
    return await request({ url: `/api/get_user_info`,  method: 'post', headers: header });
  },



  // 开奖记录
  async getRecords() {
    const { data } = await request({ url: `/api/ferris/records`,  method: 'post', headers: header });
    return data.rows.map(item => {
      return {
        ...item,
        moment_profit: Number(item.moment_profit)
      }
    }) || []
  },

  // 获取中奖情况
  async getActionResult() {
    const { data } = await request({ url: `/api/ferris/actionResult`, headers: header });
    return data;
  },

  // 下注
  async postFerrisGo(data) {
    const { result } = await request({ url: `/api/ferris/click`,  method: 'post', headers: header, data: { betItem: data } });
    return result;
  },
}
