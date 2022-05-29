/**
 * /*Body
 *
 * @format
 */
import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
export class Body {
  sno: string = '';
  sid: string = '';
  fid: string = Common.getUserId();
  type = Constant.CLOSE_WINDOW;
  flowId: string = Common.getUuid();
}

/*Header*/
export class Header {
  token: string = Common.getToken();
}

/*tsModel2*/
export class CloseWindowMsg {
  lwp = '/sendFunctionMessage';
  body: Body = new Body();
  // header: Header = new Header();
  code?: number;
  errorMsg?: string;
}
