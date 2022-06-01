import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Utils from '@/Utils';
import ComImage from '@/Components/Common/ComImage';
import GlobalStyles from '@/Assets/Styles/GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';
import Images from '@/Assets/Images';
import TouchableButton from '@/Components/Common/TouchableButton';
import GlobalVar from '@/GlobalVar';

export type Props = {
  onPress?: () => void;
  onSend?: (value: string) => void;
};

export type State = {
  value: string;
};

export default class ChatInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.value !== this.state.value;
  }

  //处理触控
  handleTouchable(callback: any) {
    callback && callback();
  }
  render() {
    const { value } = this.state;
    return (
      <View style={styles.chatInputBox}>
        <TouchableButton
          touchable={() => console.log('点击了语音')}
          html={<ComImage style={styles.avatar} source={Images.Common.voice} />}
        />
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={(text) => this.onChangeText(text)}
        />
        <TouchableButton
          touchable={() => console.log('点击了表情')}
          html={
            <ComImage style={styles.rightImage} source={Images.Common.face} />
          }
        />
        <TouchableButton
          touchable={() => this.handleSend()}
          html={this.handleSendShow()}
        />
      </View>
    );
  }

  onChangeText(text: string) {
    this.setState({ value: text });
  }

  // 处理显示发送文字/图片按钮
  handleSendShow() {
    const { value } = this.state;
    if (value) {
      return (
        <View style={styles.emptyButton}>
          <Text style={styles.buttonText}>发送</Text>
        </View>
      );
    }
    return <ComImage style={styles.rightImage} source={Images.Common.add} />;
  }

  // 处理发送逻辑
  handleSend() {
    const { value } = this.state;
    if (value) {
      //发送文字
      // Utils.showToast('发送' + value);
      GlobalVar.ws?.send(
        JSON.stringify({
          type: 'send',
          data: value,
        }),
      );
      this.props.onSend && this.props.onSend(value);
      this.setState({ value: '' });
    } else {
      //发送其他
      Utils.showToast('尽情期待');
    }
  }
}

const styles = StyleSheet.create({
  MLAuto: {
    marginLeft: 'auto',
  },
  MRAuto: {
    marginRight: 'auto',
  },
  chatInputBox: {
    ...GlobalStyles.borderTopMin,
    ...GlobalStyles.commonPadding,
    display: 'flex',
    flexDirection: 'row',
    height: Utils.scaleSize(54),
    alignItems: 'center',
  },
  avatar: {
    width: Utils.scaleSize(26),
    height: Utils.scaleSize(26),
    marginRight: Utils.scaleSize(12),
  },
  chatRight: {
    ...GlobalStyles.borderMin,
    flex: 1,
    height: '100%',
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
  textInput: {
    flex: 1,
    height: Utils.scaleSize(40),
    paddingLeft: Utils.scaleSize(8),
    paddingRight: Utils.scaleSize(8),
    backgroundColor: 'white',
    borderRadius: Utils.scaleSize(4),
  },
  rightImage: {
    width: Utils.scaleSize(26),
    height: Utils.scaleSize(26),
    marginLeft: Utils.scaleSize(12),
  },
  emptyButton: {
    width: Utils.scaleSize(54),
    height: Utils.scaleSize(32),
    marginLeft: Utils.scaleSize(12),
    backgroundColor: '#3770EB',
    borderRadius: Utils.scaleSize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: Utils.scaleSize(16),
  },
});
