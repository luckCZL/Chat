import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import { Prop } from './model/TouchableButton';
// 触控点击
export default class TouchableButton extends Component<Prop, {}> {
  constructor(props: Prop) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor={
          !this.props.underlayColor ? '' : this.props.underlayColor
        }
        onPress={() =>
          this.props.touchable && this.props.touchable(this.props.tabKey)
        }>
        {this.props.html}
      </TouchableHighlight>
    );
  }
}
