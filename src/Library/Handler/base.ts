/** @format */

import Watcher from '@/Library/Watcher';
import { HeartCheck } from './Entries/HeartCheck';
import Home from '@/Pages/Home';
import { TextMsg } from './Entries/Text';
import Constant from '../Constant';
import { Queue } from './Entries/queue';
import { NoCustomer } from './Entries/NoCustomer';
import { CustomPersonal } from './Entries/CustomPersonal';
import Common from '@/Library/Common';
import { EndSessionMsg } from './Entries/EndSessionMsg';
import { InviteAppraise } from './Entries/InviteAppraise';
import { PictureMsg, PictureBody } from './Entries/PictureMsg';
import { PersonalReception } from './Entries/PersonalReception';
import { QuestionAnswer } from './Entries/Question';
import { MessageReCell } from './Entries/messageReCell';
import { DocumentMsg } from './Entries/DocumentMsg';
import { CardBody, CardMsg } from './Entries/CardInfoMsg';
import { TokenCheck } from './Entries/TokenCheckt';
import { HistoryMsgBody } from './Entries/HistoryMsg';
import GlobalVar from '@/GlobalVar';
import { GetSno } from './Entries/GetSno';
import { VideoMsg } from './Entries/VideoMsg';

export default class Base {
  public static instance: Home;
  protected reactInstance: Home | null = null;
  protected timer: null | NodeJS.Timeout = null;
  public init(_this: Home): void {
    this.reactInstance = _this;
    Base.instance = _this;
    // this.listenConnect(); // 监听连接
    // this.listenToken(); // 监听token
    // this.listenHeart(); // 监听心跳
    // this.listenText();
  }

  /**
   * @protected
   * @memberof Base
   */
  protected listenConnect(): void {
    // 连接成功
    Watcher.$on('connectSuccess', (e: any) => {
      const token = new TokenCheck();
      token.header.token = Common.getToken();
      token.header.userId = Common.getUuid();
      // token.body.type = '10001';
      // 发送消息
      console.log(e, '连接成功');
      Watcher.$emit('sendMsg', token);
    });
  }

  /**
   *
   * @description 监听token变化
   * @protected
   * @memberof Base
   */
  protected listenToken(): void {
    // token验证成功
    Watcher.$on(Constant.TOKEN_CHECK, (msg: TokenCheck) => {
      console.log('每次重连都到这里吗？------------------------', msg);
      // 发送心跳
      Watcher.$emit('sendMsg', new HeartCheck());
    });
  }

  /**
   *
   * @description tcp连接状态
   * @protected
   * @memberof Base
   */
  protected listenTcpStauts(): void {
    Watcher.$on(Constant.TCP_STAUTS, (value: number) => {
      console.log(value, 'tcp连接状态');
      // 连接断开，连接失败
      // if (value === 3) {
      //   // 断开连接不显示转人工
      //   this.reactInstance?.props.messageStore.changeIsPersonalReception(0);
      // }
      // console.log('tcp连接状态', value);
      // this.reactInstance &&
      //   this.reactInstance.props.messageStore.setTcpState(value);
    });
  }

  /**
   *
   * @description 监听心跳
   * @protected
   * @memberof Base
   */
  protected listenHeart(): void {
    // 监听心跳成功
    Watcher.$on(Constant.HEART_CHECKT, () => {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log('发送心跳');
        Watcher.$emit('sendMsg', new HeartCheck());
      }, 28 * 1000);
    });
  }

  // 监听文字发送
  protected listenText(): void {
    Watcher.$on(Constant.NORMAL_MESSAGE, (textMsg: TextMsg) => {
      console.log(textMsg, '监听文本发送成功');
    });
  }
}
