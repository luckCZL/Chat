import Common from '@/Library/Common';
import Constant from '@/Library/Constant';
import Utils from '@/Utils';
export class Data {
  id: number = 0;
  title: string = '';
  answer: string = '';
}

// 请求知识库所有随机问题
export class QuestionBody {
  id?: string;
  sno: string = ''; // 咨询编号
  fid: string = ''; // 用户id
  toId = ''; // 对方用户id
  type = Constant.REPOSITORY_MESSAGE; // 类型
  body: string = ''; // 实际内容
  createTime: number = new Date().getTime();
  updateTime: number = new Date().getTime();
  flowId: string = Common.getUuid(); // 唯一
  noShowTextLoading: boolean = false;
  showYouWantToAskBox: boolean = false; // 是否显示"猜你想问"的组件
  keyword: string = ''; // 智能问答的关键字 用户换一换的时候也能搜索对应的知识库
}

// 单个机器人问答消息体
export class QuestionAnswerBody {
  body: string = '';
  repositoryId: number = 0;
  createTime: number = new Date().getTime();
  flowId: string = Common.getUuid();
  ftype: number = 0;
  id: string = '';
  sno: string = '';
  toId: string = '';
  type: number = Constant.REPOSITORY_MESSAGE;
  appraise: number = 0; // 1好评 2差评
  showAppraise: boolean = false; // 显示点评
  noShowTextLoading: boolean = false;
  showYouWantToAskBox: boolean = false; // 是否显示"猜你想问"的组件
  fid: string = Common.getUserId(); // 用户id
  updateTime: number = new Date().getTime();
  channelNo: string = Common.getChannelNo();
  keyword: string = ''; // 智能问答的关键字 用户换一换的时候也能搜索对应的知识库
}

/*Header*/
export class Header {
  flowId: string = Utils.getUuid(); // 本地唯一id
  token: string = ''; // 令牌
}

/*tsModel2*/
export class QuestionAnswer {
  lwp = '/sendNormalMessage';
  body: QuestionAnswerBody = new QuestionAnswerBody();
  // header: Header = new Header();
  code?: number;
  errorMsg?: string;
}
