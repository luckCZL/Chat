import { chatItemInterface } from '@/Interface/chat';
import { pageParams } from '@/Interface/common';

export type RootStackParamList = {
  Home: pageParams;
  Login: undefined;
  Register: undefined;
  state: undefined;
  Chat: chatItemInterface;
};
