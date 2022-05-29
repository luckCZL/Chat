import { ImageSourcePropType } from "react-native";

export type Props = {
  showLeftIcon?: boolean;
  leftText?: string;
  rightIcon?: ImageSourcePropType;
  goBack?: () => void;
};
