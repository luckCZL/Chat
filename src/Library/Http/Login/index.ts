/** @format */

import { UserInfoInterface } from '@/Interface/common';
import HttpBase from '../base';
interface registerInterface {
  mobile: string;
  password: string;
}
interface UserInfo {
  avatar: string;
  channel: string;
  gender: string;
  mobile: string;
  openId: string;
  sys: string;
  userName: string;
}
interface LoginByPwdResult {
  access_token: string;
  clientId: string;
  jti: string;
  refresh_token: string;
  token_type: string;
  userInfo: UserInfo;
  userKey: string;
}
interface LoginByTicket {
  ticket: string;
  channelNo: string;
}
/*UserInfo*/
interface UserInfo {
  companyId: string;
  gender: string;
  openId: string;
  openSystem: string;
  channel: string;
  mobile: string;
  aClientId: string;
  avatar: string;
  sys: string;
  userName: string;
  userId: string;
  staffId: string;
}

/*RegisterRes*/
interface RegisterRes {
  Mobile: string;
  SessionToken: string;
  Sex: number;
  UserId: string;
  UserStateID: string;
  Age: number;
  Name: string;
  NickName: string;
}

// 登录
const login = <T>(params: registerInterface) => {
  return HttpBase.postForm<UserInfoInterface>('/login/login', params);
};
// 注册
const register = <T>(params: registerInterface) => {
  return HttpBase.postForm<UserInfoInterface>('/login/register', params);
};
export default {
  register,
  login,
};
