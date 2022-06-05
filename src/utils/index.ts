
const md5 = require('md5');

function getQueryVariable (variable: string) {

  let query:string = window.location.search.substring(1);
  let vars:Array<string> = query.split("&");

  for (let i=0; i<vars.length; i++) {
    let pair:Array<string> = vars[i].split("=");

    if (pair[0] == variable) {
      return pair[1];
    }

  }

  return(false);
}

function getCookie (cname: string) {
  let name:string = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

type historyType = {

  token?: string

  'Accept-Language'?: string

}

let header:historyType = {}

if (getCookie("biubiuclub_cookiehttp_token")) {
  header['token'] = getCookie("biubiuclub_cookiehttp_token");
}

if (getCookie("biubiuclub_cookieaccept_language")) {
  header['Accept-Language'] = getCookie("biubiuclub_cookieaccept_language");
}

function getSignParams(params?:any) {

  let timestamp = Date.now();
  let p:string = "timestamp=" + timestamp + "&key=cFSSbyds4znU92S9";

  if (params == null) {

    return {
      ...header,
      "timestamp": timestamp,
      "biuBiuSign": md5(p).toUpperCase()
    }
  }

  // 进行排序
  const keys = Object.keys(params);

  keys.sort();

  let str = "";

  keys.forEach(key => {
    str += key + "=" + params[key] + "&"
  });

  str += p;


  return {
    ...header,
    "timestamp": timestamp,
    "biuBiuSign": md5(str).toUpperCase()
  }
}

export {
  header,
  getCookie,
  getQueryVariable,
  getSignParams
}

