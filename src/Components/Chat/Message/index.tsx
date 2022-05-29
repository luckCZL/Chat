import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Utils from '@/Utils';
import ComImage from '@/Components/Common/ComImage';
import GlobalStyles from '@/Assets/Styles/GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';
import Images from '@/Assets/Images';
import TouchableButton from '@/Components/Common/TouchableButton';
import { Popover } from 'teaset';
import { chatMessageItemInterface } from '@/Interface/chat';

export type Props = {
  params?: chatMessageItemInterface;
  data: chatMessageItemInterface;
};

export type State = {
  value: string;
};

export default class MessageItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  // shouldComponentUpdate(nextProps: Props) {
  //   return nextProps.data !== this.props.data;
  // }

  //处理触控
  handleTouchable(callback: any) {
    callback && callback();
  }
  render() {
    const { data } = this.props;
    return <View style={styles.messageItem}>{this.handleType(data)}</View>;
  }

  // 处理消息类型
  handleType(data: chatMessageItemInterface) {
    switch (data.type) {
      case 101: //文字消息
        if (data.isSelf) {
          return this.myMessage(data);
        } else {
          return this.taMessage(data);
        }
    }
    return this.taMessage(data);
  }

  // 对方发的消息
  taMessage(data: chatMessageItemInterface) {
    return (
      <View style={[styles.itemBox, styles.taItem]}>
        <ComImage
          style={[styles.avatar, styles.taAvatar]}
          source={{ uri: data.fromAvatar }}
        />
        <Popover
          style={[styles.blackStyle, styles.shadowStyle]}
          arrow="leftTop"
          paddingCorner={Utils.scaleSize(13)}>
          <Text style={styles.messageText}>{data.content}</Text>
        </Popover>
      </View>
    );
  }

  // 我发的消息
  myMessage(data: chatMessageItemInterface) {
    return (
      <View style={[styles.itemBox, styles.myItem]}>
        <ComImage
          style={[styles.avatar, styles.myAvatar]}
          source={{ uri: data.fromAvatar }}
        />
        <Popover
          style={[styles.myBlackStyle, styles.shadowStyle]}
          arrow="rightTop"
          paddingCorner={Utils.scaleSize(13)}>
          <Text style={styles.messageText}>{data.content}</Text>
        </Popover>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // 消息item组件
  messageItem: {
    ...GlobalStyles.commonPadding,
    marginTop: Utils.scaleSize(8),
    marginBottom: Utils.scaleSize(8),
  },
  itemBox: {
    display: 'flex',
  },
  taItem: {
    flexDirection: 'row',
  },
  myItem: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: Utils.scaleSize(34),
    height: Utils.scaleSize(34),
    borderRadius: Utils.scaleSize(4),
  },
  taAvatar: {
    marginRight: Utils.scaleSize(4),
  },
  myAvatar: {
    marginLeft: Utils.scaleSize(4),
  },
  blackStyle: {
    maxWidth: Utils.scaleSize(260),
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  myBlackStyle: {
    maxWidth: Utils.scaleSize(260),
    backgroundColor: '#cbdbe2',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  shadowStyle: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  messageText: {
    lineHeight: Utils.scaleSize(22),
    fontSize: Utils.scaleSize(15),
    color: '#131415',
  },
});
