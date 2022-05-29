/**
 * /*Body
 *
 * @format
 */
import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
export class Body {
  body?: string;
  flowId: string = Common.getUuid(); // 唯一
  sid: number = Common.getSid(); // 会话id
  sno: string = Common.getSno(); // 咨询编号
  channelNo?: string = Common.getChannelNo(); // 渠道编号
  fid: string = Common.getUserId(); // 消息发送者id
  ftype: number = Common.getFtype(); // 发送者是否客服 0-用户 1-客服
  toId: string = ''; // 消息归属者id
  type = Constant.END_SESSION; //20006
  manualFlag: number = 0; // 是否转人工 0否， 1是
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel2*/
export class EndSessionMsg {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  // header: Header = new Header();
}
