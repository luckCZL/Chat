/** @format */

import * as Upload from './Upload'; // 上传
import * as Session from './Session'; // 聊天列表
import Login from '@/Pages/Login';
const Http = {
  ...Upload,
  Login,
  ...Session,
};

export default Http;
