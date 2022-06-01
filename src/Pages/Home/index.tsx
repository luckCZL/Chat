import Utils from '@/Utils';
import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import Base from '../Base';
import GlobalVar from '@/GlobalVar';
import Props from './Props';
import { State } from './State';
import NavBar from '@/Components/NavBar';
import { FlatList } from 'react-native-gesture-handler';
import ChatItem from '@/Components/List/Chat';
import { chatItemInterface, chatMessageItemInterface } from '@/Interface/chat';
import GlobalStyles from '@/Assets/Styles/GlobalStyles';
import Handler from '@/Library/Handler';
import Tcp from '@/Library/Tcp';
import { inject, observer } from 'mobx-react';
import Mock from 'mockjs';

let that: any = null;
@inject('messageStore')
@observer
export default class Home extends Base<Props, State> {
  phoneNumber: string = '';
  ws: WebSocket | null = null;
  constructor(props: Props) {
    super(props);
    GlobalVar.comingCustomServicePage = true;
    // 初始化组件状态
    this.state = {
      refreshing: true,
      chatList: [],
    };
  }

  componentDidMount() {
    that = this;
    this._onRefresh();

    this.handleData();
    // new Handler().init(that);
    // new Tcp().connect();
    console.log(this.props.route, 'home');

    this.onWs();
  }

  componentWillUnmount() {
    console.info(22);
    this.ws?.close();
    GlobalVar.ws?.close();
  }

  onWs = () => {
    // this.ws = new WebSocket('ws://192.168.119.156:8888');
    this.ws = new WebSocket('ws://192.168.31.144:9999');
    GlobalVar.ws = this.ws;
    this.ws.onopen = (e) => {
      console.log('onopen', e);
      this.ws?.send(
        JSON.stringify({
          type: 'register',
          userName: GlobalVar.UserInfo.name,
        }),
      );
    };
    this.ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log('onmessage', data);

      switch (data.type) {
        case 'message':
          // 会话列表
          const chatList = data.data.map((element) => {
            const { id, name, type, online, message, updateTime } = element;
            return {
              id,
              avatar:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1291089457,3418078582&fm=26&gp=0.jpg',
              userId: id,
              userName: name,
              message,
              content: message.length
                ? message[message.length - 1].content
                : '',
              updateTime,
            };
          });
          // this.setState({ refreshing: false });
          this.setState({ chatList, refreshing: false });
          break;
        case 'send':
          console.info('来消息啦');
          this.props.messageStore.saveMessageDataItem(data.data);
          break;

        default:
          break;
      }
    };
    this.ws.onclose = (e) => {
      console.log('onclose', e);
    };
    this.ws.onerror = (e) => {
      console.log('onerror', e);
    };
  };

  handleData() {
    const { messageStore } = this.props;
    const Random = Mock.Random;
    const taData = {
      avatar:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608313611618&di=7e53a179a48460daec0ba828e96bec08&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
      userId: 'dkajdajjdad',
      userName: '淡淡无味',
    };
    const myData = {
      avatar:
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1291089457,3418078582&fm=26&gp=0.jpg',
      userId: 'dkajdajjdad',
      userName: '蜗牛实习生',
    };
    const data: chatMessageItemInterface[] = [];
    for (let i = 0; i < 2; i++) {
      const isSelf = Boolean(Math.round(Math.random()));
      let newObj: chatMessageItemInterface = {
        id: i,
        type: 101,
        isSelf: isSelf,
        fromAvatar: isSelf ? myData.avatar : taData.avatar,
        fromUserId: isSelf ? myData.userId : taData.userId,
        fromUserName: isSelf ? myData.userName : taData.userName,
        toAvatar: !isSelf ? myData.avatar : taData.avatar,
        toUserId: !isSelf ? myData.userId : taData.userId,
        toUserName: !isSelf ? myData.userName : taData.userName,
        content:
          Random.ctitle() + Random.cname() + Random.ctitle() + Random.cname(),
        createTime: Random.natural(1856985475474, 1886985475474),
      };
      data.push(newObj);
    }
    // messageStore.saveMessageData(data);
  }

  render() {
    const { refreshing, chatList } = this.state;
    const data = [
      {
        id: '1',
        avatar:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608313611618&di=7e53a179a48460daec0ba828e96bec08&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
        userId: 'dkajdajjdad',
        userName: '蜗牛实习生',
        content: '明天打球吗',
        updateTime: 17854585454,
      },
      {
        id: '2',
        avatar:
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1291089457,3418078582&fm=26&gp=0.jpg',
        userId: 'dkajdajjdad',
        userName: '淡淡无味',
        content: '你好帅呀',
        updateTime: 17854585454,
      },
      {
        id: '3',
        avatar:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608313611618&di=7e53a179a48460daec0ba828e96bec08&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
        userId: 'dkajdajjdad',
        userName: '信心之火',
        content: '明天打球吗',
        updateTime: 17854585454,
      },
      {
        id: '4',
        avatar:
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1291089457,3418078582&fm=26&gp=0.jpg',
        userId: 'dkajdajjdad',
        userName: '程序员',
        content: '你好帅呀',
        updateTime: 17854585454,
      },
    ];
    return (
      <View style={styles.container}>
        <NavBar showLeftIcon={false} leftText={GlobalVar.UserInfo.name} />
        <FlatList
          data={chatList}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item, index) => item.id + index}
          style={styles.homeContainter}
          indicatorStyle={'black'}
          showsHorizontalScrollIndicator={true}
          bounces={true}
          refreshControl={
            <RefreshControl
              tintColor={GlobalStyles.mainColor.color}
              titleColor={GlobalStyles.mainColor.color}
              // title={'正在刷新......'}
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }

  renderItem(item: any) {
    return (
      <ChatItem data={item.item} onPress={() => this.handleToChat(item.item)} />
    );
  }

  handleToChat(item: chatItemInterface) {
    this.props.navigation.navigate('Chat', item);
  }

  // 刷新会话列表
  _onRefresh() {
    if (this.state.refreshing === false) {
      this.setState({ refreshing: true });
    }
    // setTimeout(() => {
    //   this.setState({ refreshing: false });
    // }, 2000);
    console.log('刷新');
  }

  // 点击导航栏回退
  goBack = (): void => {
    this.nativeGoBack();
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
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    paddingBottom: Utils.scaleSize(12),
  },
  homeContainter: {
    flex: 1,
    // paddingLeft: Utils.scaleSize(16),
    // paddingRight: Utils.scaleSize(16),
  },
  fileItem: {
    marginTop: Utils.scaleSize(12),
    backgroundColor: 'white',
    borderRadius: Utils.scaleSize(8),
  },
  noPaddingLeftRight: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  imageStyle: {
    height: 180,
    padding: 20,
  },
  viewPagerStyle: {
    height: 180,
  },
  txtStyle: {
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
  },
  videoBox: {
    marginTop: 10,
    width: 200,
    height: 150,
    backgroundColor: '#FFC1C1',
  },
  talkItem: {
    marginTop: Utils.scaleSize(12),
  },
  ActivityIndicator: {
    paddingTop: 20,
  },
  Overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadWrap: {
    backgroundColor: '#333',
    padding: Utils.scaleSize(16),
    borderRadius: Utils.scaleSize(10),
    alignItems: 'center',
    opacity: 0.8,
  },
  // 选择图片测试
  testImagesBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  testImages: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  backgroundVideo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  MT12: {
    marginTop: Utils.scaleSize(12),
  },
  // 指示条样式
  lineBar: {
    // paddingTop: Utils.scaleSize(20),
    // paddingBottom: Utils.scaleSize(20),
    // paddingLeft: Utils.scaleSize(20),
    // paddingRight: Utils.scaleSize(20),
    backgroundColor: 'transparent',
  },
  lineBarBox: {},
});
