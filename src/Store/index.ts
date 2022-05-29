import CommonStore from './modules/CommonStore';
import MessageStore from './modules/MessageStore';
import UserDefaultData from './modules/UserModel';

export default {
  commonStore: new CommonStore(),
  UserStore: new UserDefaultData(),
  messageStore: new MessageStore(),
};
