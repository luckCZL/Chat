import Realm from 'realm';

/***表定义区**/
export const UserInfoTableName = 'UserInfo';
export const HistoryTableName = 'History';
export const CityTableName = 'City';

// 用户信息表
const UserInfoSchema = {
  name: UserInfoTableName,
  primaryKey: 'Id',
  properties: {
    ID: 'int', //主键id
    Account: 'string', //用户账号
    UserID: 'string', //用户id
    NickName: 'string', //昵称
    PassWord: 'string', //密码
    Salt: 'string', //盐
    SignaTure: 'string', //个性签名
    Sex: 'int', //姓名 1男2女
    Birthday: 'string', //生日
    Mobile: 'string', //手机
    Name: 'string', //真实姓名
    EMail: 'string', //邮箱
    Intro: 'string', //个人简介
    Avatar: 'string', //头像
    ShengXiao: 'string', //生肖
    Age: 'int', //年龄
    NationId: 'string', //国家id
    ProvinceId: 'string', //省份id
    CityID: 'string', //城市id
    FriendPolicyQuestion: 'string', //好友策略问题
    FriendPolicyAnswer: 'string', //好友策略答案
    FriendPolicyPassword: 'string', //好友策略密码
    SessionToken: 'string', //身份令牌
    IsDel: 'int', //是否注销账号
    Openid: 'string', //第三方openid
    CreateTime: 'int', //创建时间
    UpdateTime: 'int', //最后更新时间
  },
};

const instance = new Realm({
  schema: [UserInfoSchema],
  deleteRealmIfMigrationNeeded: true,
  inMemory: false,
});

/***表使用区**/
export function writeToRealm(obj: RealmInsertionModel<unknown>, tabName: any) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      instance.create(tabName, obj, true);
      resolve(true);
    });
  });
}

export function queryAllFromRealm(tabName: string) {
  return new Promise((resolve, reject) => {
    let obj = instance.objects(tabName);
    let objStr = JSON.stringify(obj);
    resolve(JSON.parse(objStr));
  });
}

export function clearAllFromRealm(tabName: string) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      let arrays = instance.objects(tabName);
      instance.delete(arrays);
      resolve(true);
    });
  });
}

export function clearRowFromRealm(id: string, tabName: string) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      let arrays = instance.objects(tabName);
      let row = arrays.filtered('id==' + id);
      instance.delete(row);
      resolve(true);
    });
  });
}
