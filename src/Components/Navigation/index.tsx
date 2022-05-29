import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Utils from '@/Utils';
import { Props } from './Props';
import Images from '@/Assets/Images';
import TouchableButton from '../Common/TouchableButton';

export default class Navigation extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  static defaultProps: Props = {
    showLeftIcon: true,
    leftText: '',
    rightIcon: Images.Common.setting,
  };

  //处理触控
  handleTouchable(callback: any) {
    callback && callback();
  }
  render() {
    const { showLeftIcon, leftText, rightIcon } = this.props;
    return (
      <View style={[this.props.style, styles.navigation]}>
        <View style={styles.navItem}>
          <Text>首页</Text>
        </View>
        <View style={styles.navItem}>
          <Text>动态</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
