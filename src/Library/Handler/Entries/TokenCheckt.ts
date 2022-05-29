/** @format */

import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
/** @format */
/*Header*/
export class Header {
  userId: string = ''; //用户id
  token: string = ''; //token
}

/*tsModel1*/
export class TokenCheckFail {
  code: number = 0;
  data: null | undefined;
  isSuccess: boolean = false;
  message: string = '';
  timestamp: number = 0;
}

export class Body {
  type: string = '10001'; //数据类型
  data: string = ''; //数据
}

/*tsModel1*/
export class TokenCheck {
  lwp = '/reg';
  header: Header = new Header();
  body: Body = new Body();
}
