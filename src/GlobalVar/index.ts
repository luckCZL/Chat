import { UserInfoInterface } from "@/Interface/common";

export default class GlobalVar {
  static isFirst = true;
  static hasPostHistory = false; //有请求历史记录
  static comingCustomServicePage = false; //程序是否进去社交圈页面
  static env = 1;
  static token: string = 'b9f408584c35549600315c4007cbed96';
  static UserInfo: UserInfoInterface = new UserInfoInterface();
  static isNavigation: boolean = true; //是否显示底部导航栏
}
