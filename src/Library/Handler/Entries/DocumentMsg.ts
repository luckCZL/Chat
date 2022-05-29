/** @format */

import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
export class Data {
  id: number = 0;
  title: string = '';
  answer: string = '';
}
/**
 * /*Body
 *
 * @format
 */
export class DocumentBody {
  sno: string = ''; // 咨询编号
  fid: string = Common.getUserId(); // 用户id
  ftype: number = Common.getFtype(); // 1-客服 2-客户
  toId = ''; // 对方用户id
  type = Constant.DOCUMENT_MESSAGE; // 类型
  body = ''; // 实际内容
  createTime: number = new Date().getTime();
  updateTime: number = new Date().getTime();
  flowId: string = Common.getUuid(); // 唯一
  channelNo: string = Common.getChannelNo();
}

/*Header*/
export class Header {
  token: string = ''; // 令牌
}

/*tsModel2*/
export class DocumentMsg {
  lwp: string = '/sendNormalMessage';
  body: DocumentBody = new DocumentBody();
  // header: Header = new Header();
  code?: string;
  errorMsg?: string;
}
