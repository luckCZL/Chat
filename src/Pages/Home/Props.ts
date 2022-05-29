import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/Route/types';
import MessageStore from '@/Store/modules/MessageStore';
import { pageParams } from '@/Interface/common';

export default class Props {
  navigation!: StackNavigationProp<RootStackParamList, 'Home'>;
  route!: { params: pageParams };
  messageStore!: MessageStore;
}
