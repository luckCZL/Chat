import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/Route/types';
import { chatItemInterface } from '@/Interface/chat';
import MessageStore from '@/Store/modules/MessageStore';

export default class Props {
  navigation!: StackNavigationProp<RootStackParamList, 'Chat'>;
  route!: { params: chatItemInterface };
  messageStore!: MessageStore;
}
