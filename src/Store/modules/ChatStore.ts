import { chatItemInterface } from '@/Interface/chat';
import { observable, action } from 'mobx';
class ChatStore {
  @observable chatData = [];

  // 存储会话列表数据-数组格式
  // @action saveChatData(chatData: chatItemInterface[]): void {

  // }

  // 存储会话列表数据-单个对象格式
  @action saveChatDataItem(chatData: chatItemInterface): void {
    this.chatData = { ...this.chatData, ...chatData };
  }
}
export default ChatStore;
