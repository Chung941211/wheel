import { request } from 'ice';
import { header } from '../utils';



export default {

  //
  async getFsc() {
    const data = await request({
      url: `/api/fsc/section`,
      data: {
        offset: '',
        page: ''
      },
      method: 'post',
      headers: header
    });
    return data.data;
  }
}
