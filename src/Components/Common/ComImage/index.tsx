import * as React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';
import Images from '@/Assets/Images';

interface Props extends ImageProps {}
interface State {}
// source属性
// 自动识别http或本地图片
export default class ComImage extends React.Component<Props, State> {
  static defaultProps = {
    source: Images.Common.imageLoading,
  };
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { source } = this.props;
    return (
      <Image
        {...this.props}
        style={[styles.image, this.props.style]}
        source={
          (source && source.toString().startsWith('http')) ||
          source.toString().startsWith('file://')
            ? { uri: source.toString() }
            : source
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    padding: 0,
  },
});
