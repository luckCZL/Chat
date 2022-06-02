import Utils from '@/Utils';
import * as React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import Base from '../Base';
import GlobalVar from '@/GlobalVar';
import Props from './Props';
import { State } from './State';
import NavBar from '@/Components/NavBar';
import ComImage from '@/Components/Common/ComImage';
import { FlatList } from 'react-native-gesture-handler';
import ChatInput from '@/Components/Chat/ChatInput';
import { Popover } from 'teaset';
import GlobalStyles from '@/Assets/Styles/GlobalStyles';
import MessageItem from '@/Components/Chat/Message';
import { chatMessageItemInterface } from '@/Interface/chat';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@inject('messageStore')
@observer
export default class Chat extends Base<Props, State> {
  phoneNumber: string = '';
  private _flatList!: FlatList<chatMessageItemInterface> | null;
  constructor(props: Props) {
    super(props);
    GlobalVar.comingCustomServicePage = true;
    // 初始化组件状态
    this.state = {};
  }

  componentDidMount() {
    const { messageStore } = this.props;
    const { params } = this.props.route;
    console.info(params, '聊天页参数');
    messageStore.saveMessageData(params.message || []);
  }

  render() {
    const { messageStore } = this.props;

    return (
      <View style={styles.container}>
        <NavBar
          showLeftIcon={true}
          // leftText={params.userName}
          leftText={GlobalVar.UserInfo.name}
          goBack={() => this.goBack()}
        />
        <KeyboardAvoidingView style={styles.homeContainter}>
          <FlatList
            style={styles.faltList}
            ref={(flatList) => (this._flatList = flatList)}
            data={messageStore.MessageData}
            extraData={messageStore.MessageData}
            renderItem={(item) => this.renderItem(item.item)}
            keyExtractor={(item, index) => '' + item.id + index}
          />
          <ChatInput onSend={(value) => this.onSend(value)} />
        </KeyboardAvoidingView>
      </View>
    );
  }

  renderItem(item: chatMessageItemInterface) {
    return <MessageItem data={item} />;
  }

  // 发送文字
  onSend(value: string) {
    const { messageStore } = this.props,
      { params } = this.props.route;
    let data = new chatMessageItemInterface();
    data = {
      id: messageStore.MessageData.length + 1,
      type: 101,
      isSelf: true,
      fromAvatar: GlobalVar.UserInfo.avatar,
      fromUserId: GlobalVar.UserInfo.userId,
      fromUserName: GlobalVar.UserInfo.nickName,
      toAvatar: params.avatar,
      toUserId: params.userId,
      toUserName: params.userName,
      content: value,
      createTime: new Date().getTime(),
    };
    this.props.messageStore.saveMessageDataItem(data);
    GlobalVar.ws?.send(
      JSON.stringify({
        type: 'send',
        data,
      }),
    );
    this.scrollToEnd();
  }

  public scrollToEnd() {
    this._flatList.scrollToEnd();
  }

  handleToDetail() {
    console.log(11111);
  }

  // 点击导航栏回退
  goBack = (): void => {
    this.props.navigation.goBack();
  };
}
const styles = StyleSheet.create({
  menuDrawer: {
    paddingBottom: 0,
    // paddingTop: Utils.scaleSize(20),
    backgroundColor: '#F6F7F9',
  },
  viewPager: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    // paddingBottom: Utils.scaleSize(12),
  },
  homeContainter: {
    flex: 1,
    // paddingLeft: Utils.scaleSize(16),
    // paddingRight: Utils.scaleSize(16),
    backgroundColor: '#e9eef1',
  },
  faltList: {
    flex: 1,
    paddingTop: Utils.scaleSize(10),
  },
});
