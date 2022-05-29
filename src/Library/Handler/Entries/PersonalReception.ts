import Common from '@/Library/Common';
import Constant from '@/Library/Constant';

/*Body*/
export class Body {
  fid: string = Common.getUserId();
  fname: string = Common.getUserName();
  favatar: string = Common.getAvatarUrl();
  type: number = Constant.PERSONNEL_RECEPTION;
  rank = '1';
  channelNo = Common.getChannelNo();
  duty: string = '';
  flowId: string = Common.getUuid(); // 唯一
  content: string = '';
  sno: string = Common.getSno();
}

/*Header*/
export class Header {
  flowId: string = '';
  token: string = '';
}

/*tsModel2*/
export class PersonalReception {
  lwp: string = '/sendFunctionMessage';
  body: Body = new Body();
  // header: Header = new Header();
}
