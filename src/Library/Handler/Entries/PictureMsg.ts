/** @format */

import Utils from '@/Utils/index';
import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
/**
 * /*Body
 *
 * @format
 */

export class PictureBody {
  width = 0;
  height = 0;
  url = '';
}

export class Body {
  sno: string = ''; // 咨询编号
  fid: string = Common.getUserId(); // 用户id
  ftype: number = Common.getFtype(); // 1-客服 2-客户
  toId = ''; // 对方用户id
  type = Constant.PICTURE_MESSAGE; // 类型
  body = ''; // 实际内容
  createTime: number = new Date().getTime();
  updateTime: number = new Date().getTime();
  flowId: string = Common.getUuid(); // 唯一
  channelNo: string = Common.getChannelNo();
}

/*Header*/
export class Header {
  flowId: string = Utils.getUuid(); // 本地唯一id
  token: string = ''; // 令牌
}

/*tsModel2*/
export class PictureMsg {
  lwp: string = '/sendNormalMessage';
  body: Body = new Body();
  // header: Header = new Header();
  code?: string;
  errorMsg?: string;
}
