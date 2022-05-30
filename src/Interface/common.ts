// 用户信息
export class UserInfoInterface {
  mobile?: string = '18074907537';
  sessionToken?: string = '';
  sex?: number = 0;
  userId?: string = '2021010188888';
  userStateID?: string = '';
  age?: number = 20;
  name?: string = '蜗牛';
  nickName?: string = '骑着蜗牛敲代码';
  avatar?: string =
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1291089457,3418078582&fm=26&gp=0.jpg';
}

// 页面参数
export class pageParams {
  title?: string = ''; //页面标题
  isNavigation?: boolean = false; //是否显示底部导航条
}
