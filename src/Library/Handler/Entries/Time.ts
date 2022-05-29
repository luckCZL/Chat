import Common from '@/Library/Common';
import Constant from '@/Library/Constant';

export class TimeBody {
  id?: string;
  sno: string = ''; // 咨询编号
  fid: string = Common.getUserId(); // 用户id
  ftype: number = Common.getFtype(); // 1-客服 2-客户
  toId = Common.getToId(); // 对方用户id
  type = Constant.SHOW_TIME; // 类型
  body = ''; // 实际内容
  createTime: number = new Date().getTime();
  updateTime: number = new Date().getTime();
  flowId: string = Common.getUuid(); // 唯一
}
