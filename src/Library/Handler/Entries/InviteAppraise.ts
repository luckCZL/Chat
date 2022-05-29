/** @format */

import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
/**
 * /*Body
 *
 * @format
 */

export class Body {
  sno: string = '';
  sid: number = 0;
  toId: string = '';
  fid: string = Common.getUserId();
  type = Constant.INVITE_APPRAISE;
  flowId: string = Common.getUuid(); // 唯一
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel2*/
export class InviteAppraise {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  // header: Header = new Header();
}
