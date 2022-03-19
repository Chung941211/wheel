
import { getCookie } from '../utils';

let Language: string = '';
let LOCALES:any = {};

if (getCookie("biubiuclub_cookieaccept_language")) {
  Language = getCookie("biubiuclub_cookieaccept_language");
}

const messages = {
  'en-us': {
    title: 'Greedy Ferris',
    records: 'Records',
    reward: 'Reward',
    rank: 'Rank',
    rules: 'Rules',
    level: 'Round',
    selected: 'Selected',
    result: 'Result',
    winOrLose: 'Win or lose',
    time: 'Time',
    please: 'Select animals',
    settlement: 'Drawing',
    next: 'Next Game',
    you: 'YOU',
    win: 'Win',
    times: 'Times',
    balance: 'Your balance',
    profit: "Today's profit",
    news: 'New',
    round: 'The result of this round',
    second: 's',
    didnt: "You didn't bet this round",
    congratulations: "This round's biggest winner",
    attention: 'Please pay attention to check your reward',
    rewardTips: 'Users with the most weekly bets can get the items sent by the BiubiuClub, and the top three weekly get the right to use the items for 7days',
    top: 'Top',
    youWin: 'You win'
  }
  ,
  'vi-vn': {
    title: 'Greedy Ferris',
    records: 'Hồ sơ',
    reward: 'Phần',
    rank: 'Cấp độ',
    rules: 'Quy tắc',
    level: 'Round',
    selected: 'Đã chọn',
    result: 'Thành tích',
    winOrLose: 'Thắng hay thua',
    time: 'Thời gian',
    please: 'Chọn con vật',
    settlement: 'Đang mở thưởng',
    next: 'Game tiếp theo',
    you: 'Bạn',
    win: 'Win',
    times: 'Times',
    balance: 'Số dư của bạn',
    profit: "Lợi nhuận của hôm nay",
    news: 'Mới',
    round: 'Thành tích của vòng này',
    second: 's',
    didnt: "Bạn không đặt cược vòng này",
    congratulations: ' Người chiến thắng lớn nhất vòng này',
    attention: 'Hãy  kiểm tra phần thưởng của bạn',
    rewardTips: 'Người đặt cược hàng tuần nhiều nhất sẽ nhận được ô tô của nền tảng Biubiu club và ba người hàng đầu có quyền sử dụng các quà trong 7 ngày',
    top: 'Top',
    youWin: 'Bạn Win'
  }

};

LOCALES = LOCALES[Language] ? messages[Language] : messages['en-us']

export default LOCALES
