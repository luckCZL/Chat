import { chatMessageItemInterface } from '@/Interface/chat';
import { observable, action, makeObservable } from 'mobx';
class MessageStore {
  constructor() {
    makeObservable(this);
  }

  @observable MessageData: chatMessageItemInterface[] = [];

  // 存储会话列表数据-数组格式
  @action saveMessageData(data: chatMessageItemInterface[]): void {
    this.MessageData = [...this.MessageData, ...data];
  }

  // 存储会话列表数据-单个对象格式
  @action saveMessageDataItem(data: chatMessageItemInterface): void {
    this.MessageData.push(data);
  }

  @action getMessageData(): chatMessageItemInterface[] {
    return this.MessageData.slice();
  }
}
export default MessageStore;
