// 会话item
export class chatItemInterface {
  id: number = 0; //会话id
  type: number = 0; //会话类型 1-单聊 2-群聊 3-文件传输助手 4-其他
  avatar: string = ''; //会话头像
  userId: string = ''; //用户id
  userName: string = ''; //用户名称
  content: string = ''; //最新一条会话内容
  updateTime: number = 0; //更新时间
}

// 聊天消息item
export class chatMessageItemInterface {
  id: number = 0; //消息id
  type: number = 0; //会话类型 101-文本消息 102-图片 103-视频 104-语音 105-文档 106-撤回 107-时间
  isSelf: boolean = false; //是否自己发的消息
  fromAvatar: string = ''; //发-头像
  fromUserId: string = ''; //发-用户id
  fromUserName: string = ''; //发-用户名称
  toAvatar: string = ''; //收-头像
  toUserId: string = ''; //收-用户id
  toUserName: string = ''; //收-用户名称
  content: string = ''; //发送内容 url
  createTime: number = 0; //发送时间
}
