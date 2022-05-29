/** @format */

import Common from '@/Library/Common';
import Constant from '@/Library/Constant';

export class Header {
  flowId: string = Common.getUuid();
}

export class Body {
  type = Constant.HEART_CHECKT;
  flowId: string = ''; // 唯一
}

/*tsModel1*/
export class HeartCheck {
  lwp = '/idle';
  header: Header = new Header();
  body: Body = new Body();
  code?: number;
  errorMsg?: string;
}
