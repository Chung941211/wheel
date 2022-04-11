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
    let text = {"code":1,"message":"确定","data":{"info":{"roundTime":1649690626,"startTime":1649690606,"started_seconds":10,"countdown":20,"id":"FSC6053025317","times":1,"bet_duration":30,"stage_status":3,"reward_id":""},"rule_config":{"multiple":"5","is_gift_gold_beans":0,"gift_gold_beans_count":"3","gift_gold_beans_num":"1000","user_gift_num":0},"user_mic_serial":[{"position":0,"status":1,"shut_sound":0,"user_info":{"user_id":1111092,"is_master":1,"user_code":"86494791","nickname":"哈哈哈","headimgurl":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/uploads\/user_img\/20211209\/50d6e3e5d0fd4f11ad62364ae88c81d9.jpg","balance":69779},"user_id":1111092,"is_ready_game":1,"is_own":1},{"position":1,"status":1,"shut_sound":0,"user_info":{"user_id":1111088,"is_master":0,"user_code":"35596283","nickname":"狮子","headimgurl":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/cover\/default.png","balance":0},"user_id":1111088,"is_ready_game":0,"is_own":0}],"reward":[{"id":26,"name":"虎","multiple":1,"img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/363c8861b274b67f9d8a3487fbbbf219.png","show_img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/d1b8b9148e26736f4f3ffe1c1eb4df58.png","bet_diamond":0,"bet_many":1,"bet_id_list":[],"relation_reward_id":0},{"id":25,"name":"葫芦","multiple":1,"img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/95bbe8fef6059178f8a88d0f712c7707.png","show_img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/5d3a179e4854b468943cb19dfee2581e.png","bet_diamond":0,"bet_many":1,"bet_id_list":[],"relation_reward_id":0},{"id":27,"name":"鸡","multiple":1,"img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/82c4ab4ec9b341a6e2e7e925e9314567.png","show_img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/3b33c6c7d4258dfb501a1d406b234721.png","bet_diamond":0,"bet_many":1,"bet_id_list":[],"relation_reward_id":0},{"id":28,"name":"虾","multiple":1,"img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png","show_img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/09d030734942c0b182f960f3668818de.png","bet_diamond":3100,"bet_many":"1","bet_id_list":["16","16","16","15"],"relation_reward_id":"30"},{"id":30,"name":"鱼","multiple":1,"img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png","show_img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/13c399014b280913c953481362ba5c7e.png","bet_diamond":300,"bet_many":"1","bet_id_list":["15","15","15"],"relation_reward_id":0},{"id":29,"name":"蟹","multiple":1,"img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/195aecac5bd8178674020548a031cdbb.png","show_img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/5f8d2275ab21ebdf601d4ebc52dafc13.png","bet_diamond":300,"bet_many":"1","bet_id_list":["15","15","15"],"relation_reward_id":0}],"winner":{"self":{"user_id":1111092,"win_diamond":0,"bet_diamond":3700},"other":[]},"bet":[{"id":13,"desc":"1点","diamond":1},{"id":14,"desc":"10点","diamond":10},{"id":15,"desc":"100点","diamond":100},{"id":16,"desc":"1000点","diamond":1000}],"bet_records":[{"type":"二中二","reward_id":"28","name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png","bet_id":"16","bet_user_id":"1111092","reward_id_str":"28_30"},{"type":"二中二","reward_id":"28","name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png","bet_id":"16","bet_user_id":"1111092","reward_id_str":"28_30"},{"type":"二中二","reward_id":"28","name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png","bet_id":"16","bet_user_id":"1111092","reward_id_str":"28_30"},{"type":"单门","reward_id":"28","name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png","bet_id":"15","bet_user_id":"1111092","reward_id_str":"28"},{"type":"单门","reward_id":"29","name":"蟹","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/195aecac5bd8178674020548a031cdbb.png","bet_id":"15","bet_user_id":"1111092","reward_id_str":"29"},{"type":"单门","reward_id":"29","name":"蟹","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/195aecac5bd8178674020548a031cdbb.png","bet_id":"15","bet_user_id":"1111092","reward_id_str":"29"},{"type":"单门","reward_id":"29","name":"蟹","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/195aecac5bd8178674020548a031cdbb.png","bet_id":"15","bet_user_id":"1111092","reward_id_str":"29"},{"type":"单门","reward_id":"30","name":"鱼","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png","bet_id":"15","bet_user_id":"1111092","reward_id_str":"30"},{"type":"单门","reward_id":"30","name":"鱼","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png","bet_id":"15","bet_user_id":"1111092","reward_id_str":"30"},{"type":"单门","reward_id":"30","name":"鱼","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png","bet_id":"15","bet_user_id":"1111092","reward_id_str":"30"}],"today_diamond":-3700,"balance":69779,"yesterday_winner":{"user_id":0,"avatar":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/assets\/img\/avatar.png","name":"没有用户","diamond":0},"history":[{"reward_id":"26_26_28","item":[{"name":"虎","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/363c8861b274b67f9d8a3487fbbbf219.png"},{"name":"虎","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/363c8861b274b67f9d8a3487fbbbf219.png"},{"name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png"}]},{"reward_id":"25_28_27","item":[{"name":"葫芦","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/95bbe8fef6059178f8a88d0f712c7707.png"},{"name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png"},{"name":"鸡","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/82c4ab4ec9b341a6e2e7e925e9314567.png"}]},{"reward_id":"26_26_29","item":[{"name":"虎","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/363c8861b274b67f9d8a3487fbbbf219.png"},{"name":"虎","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/363c8861b274b67f9d8a3487fbbbf219.png"},{"name":"蟹","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/195aecac5bd8178674020548a031cdbb.png"}]},{"reward_id":"27_30_29","item":[{"name":"鸡","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/82c4ab4ec9b341a6e2e7e925e9314567.png"},{"name":"鱼","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png"},{"name":"蟹","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/195aecac5bd8178674020548a031cdbb.png"}]},{"reward_id":"25_28_29","item":[{"name":"葫芦","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/95bbe8fef6059178f8a88d0f712c7707.png"},{"name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png"},{"name":"蟹","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/195aecac5bd8178674020548a031cdbb.png"}]},{"reward_id":"27_28_30","item":[{"name":"鸡","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/82c4ab4ec9b341a6e2e7e925e9314567.png"},{"name":"虾","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/9f501f350060acf3bec4e2d6022cf6a0.png"},{"name":"鱼","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png"}]},{"reward_id":"27_30_30","item":[{"name":"鸡","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/82c4ab4ec9b341a6e2e7e925e9314567.png"},{"name":"鱼","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png"},{"name":"鱼","img":"https:\/\/bingochat-static-1642872278.oss-ap-southeast-1.aliyuncs.com\/upload\/betitems\/e389f94ce579c9cccad46e770bacd45f.png"}]}],"historyItemCount":[{"name":"虎","num":4},{"name":"虾","num":4},{"name":"葫芦","num":2},{"name":"鸡","num":4},{"name":"蟹","num":3},{"name":"鱼","num":4}],"rule":"鱼虾蟹"}}

    return text.data;
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
