// 配置控件的默认Theme样式

import { Theme } from 'teaset';
import Utils from '.';

export const init = () => {
  // 设置toast默认样式
  //   Theme.toastColor,
  //   Theme.toastPaddingLeft,
  //   Theme.toastPaddingRight,
  //   Theme.toastPaddingTop,
  //   Theme.toastPaddingBottom,
  //   Theme.toastBorderRadius,
  Theme.set({
    toastBorderRadius: Utils.scaleSize(9),
    toastPaddingTop: Utils.scaleSize(20),
    toastPaddingBottom: Utils.scaleSize(20),
    toastPaddingLeft: Utils.scaleSize(40),
    toastPaddingRight: Utils.scaleSize(40),
    toastColor: 'rgba(0,0,0,0.5)',
  });
};
