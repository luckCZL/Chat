import { ImageSourcePropType, StyleSheetProperties, ViewStyle } from 'react-native';

export type Props = {
  showLeftIcon?: boolean;
  leftText?: string;
  rightIcon?: ImageSourcePropType;
  goBack?: () => void;
  style: ViewStyle;
};
