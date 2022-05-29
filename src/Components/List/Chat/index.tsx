import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Utils from '@/Utils';
import Images from '@/Assets/Images';
import { chatItemInterface } from '@/Interface/chat';
import ComImage from '@/Components/Common/ComImage';
import GlobalStyles from '@/Assets/Styles/GlobalStyles';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export type Props = {
  data: chatItemInterface;
  onPress: () => void;
};

export default class ChatItem extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.data.id !== this.props.data.id;
  }

  //处理触控
  handleTouchable(callback: any) {
    callback && callback();
  }
  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        style={styles.chatTouchable}
        onPress={() => this.props.onPress()}>
        <View style={styles.chatBox}>
          <ComImage style={styles.avatar} source={{ uri: data.avatar }} />
          <View style={styles.chatRight}>
            <View style={styles.contentHead}>
              <Text style={styles.contentTitle}>{data.userName}</Text>
              {data.updateTime && (
                <Text style={GlobalStyles.comContent}>{data.updateTime}</Text>
              )}
            </View>
            <View style={styles.contentBottom}>
              <Text style={GlobalStyles.comContent}>{data.content}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  MLAuto: {
    marginLeft: 'auto',
  },
  MRAuto: {
    marginRight: 'auto',
  },
  chatTouchable: {
    ...GlobalStyles.touchableOpacity,
    paddingLeft: Utils.scaleSize(16),
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'row',
    height: Utils.scaleSize(60),
    alignItems: 'center',
  },
  avatar: {
    width: Utils.scaleSize(40),
    height: Utils.scaleSize(40),
    marginRight: Utils.scaleSize(12),
    borderRadius: Utils.scaleSize(8),
  },
  chatRight: {
    ...GlobalStyles.borderMin,
    flex: 1,
    height: '100%',
    paddingRight: Utils.scaleSize(16),
    justifyContent: 'center',
  },
  contentHead: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentTitle: {
    ...GlobalStyles.comTitle,
    flex: 1,
  },
  contentBottom: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: Utils.scaleSize(8),
  },
});
