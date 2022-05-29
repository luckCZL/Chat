import Utils from '@/Utils';
import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  // 图标大小
  maxIcon: {
    width: Utils.scaleSize(25),
    height: Utils.scaleSize(25),
  },
  icon: {
    width: Utils.scaleSize(20),
    height: Utils.scaleSize(20),
  },
  // 主色设置
  mainColor: {
    color: '#3770EB',
  },
  mainBgColor: {
    backgroundColor: '#3770EB',
  },
  comTitle: {
    fontSize: Utils.scaleSize(16),
    color: '#353739',
  },
  comContent: {
    fontSize: Utils.scaleSize(12),
    color: '#7F848B',
  },
  titleColor: {
    color: '#353739',
  },
  contentColor: {
    color: '#7F848B',
  },
  tipsColor: {
    color: '#B4B8BE',
  },
  backgroundColor: {
    color: '#F6F7F9',
  },
  borderMin: {
    borderBottomWidth: Utils.scaleSize(0.5),
    borderColor: '#ddd',
  },
  borderTopMin: {
    borderTopWidth: Utils.scaleSize(0.5),
    borderColor: '#ddd',
  },
  commonPadding: {
    paddingLeft: Utils.scaleSize(16),
    paddingRight: Utils.scaleSize(16),
  },
  // 多级文本大小设置
  maxText: {
    fontSize: Utils.scaleSize(20),
    color: '#353739',
  },
  largeText: {
    fontSize: Utils.scaleSize(18),
    color: '#353739',
  },
  mainText: {
    fontSize: Utils.scaleSize(16),
    color: '#353739',
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: Utils.scaleSize(14),
    color: '#7F848B',
  },
  minText: {
    fontSize: Utils.scaleSize(13),
    color: '#B4B8BE',
  },
  touchableOpacity: {
    backgroundColor: 'white',
  },
});

export default GlobalStyles;
