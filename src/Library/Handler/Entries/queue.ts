/** @format */

import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
/** @format */
/*Body*/
export class Body {
  parentId: string = '';
  queueNumber: string = '';
  type = Constant.QUEUE_NUMBER;
  flowId: string = Common.getUuid(); // 唯一
}

/*Header*/
export class Header {
  flowId: string = Common.getUuid();
  token: string = Common.getToken();
}

/*tsModel2*/
export class Queue {
  lwp: string = '';
  body: Body = new Body();
  // header: Header = new Header();
  code = 0;
  errorMsg = '错误信息';
}
