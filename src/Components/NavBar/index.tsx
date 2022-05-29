import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Utils from '@/Utils';
import { Props } from './Props';
import Images from '@/Assets/Images';
import TouchableButton from '../Common/TouchableButton';

export default class NavBar extends Component<Props> {
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
      <View style={styles.topBar}>
        <View style={styles.barBox}>
          <View style={styles.navLeft}>
            {showLeftIcon && (
              <TouchableButton
                touchable={() =>
                  this.props.goBack && this.handleTouchable(this.props.goBack())
                }
                html={
                  <Image style={styles.leftImg} source={Images.Common.back} />
                }
              />
            )}
            {leftText && <Text style={styles.leftText}>{leftText}</Text>}
          </View>

          <View style={styles.navRight}>
            <Image style={styles.rightImage} source={Images.Common.setting} />
          </View>
        </View>
      </View>
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
  around: {
    width: Utils.scaleSize(88),
  },
  leftImg: {
    width: Utils.scaleSize(25),
    height: Utils.scaleSize(25),
    borderRadius: Utils.scaleSize(0),
    marginLeft: Utils.scaleSize(-2),
    marginRight: Utils.scaleSize(0),
  },
  topBar: {
    width: Utils.screenW(),
    paddingLeft: Utils.scaleSize(16),
    paddingRight: Utils.scaleSize(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#e9eef1',
    borderBottomWidth: Utils.scaleSize(1),
    borderColor: '#ddd',
  },
  barBox: {
    display: 'flex',
    width: '100%',
    height: Utils.scaleSize(42),
    alignItems: 'center',
    flexDirection: 'row',
  },
  navLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    fontSize: Utils.scaleSize(16),
    color: '#151719',
  },
  navRight: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightImage: {
    width: Utils.scaleSize(16),
    height: Utils.scaleSize(16),
  },
});
