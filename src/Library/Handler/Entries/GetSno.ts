/**
 * 发送请求咨询编号的请求体
 * @format
 */
import Common from '@/Library/Common';
import Constant from '@/Library/Constant';

export class Body {
  fid: string = Common.getUserId(); // 消息发送者id
  type = Constant.GET_SNO; // 20007
  flowId: string = Common.getUuid(); // 唯一
  channelNo: string = Common.getChannelNo(); // 渠道编号
  ftype: number = Common.getFtype(); // 发送者是否客服 0-用户 1-客服
  sno?: string; // 咨询编号 后端返回sno
}

/*EndSessionMsg*/
export class GetSno {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
}
