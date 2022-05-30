import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/Route/types';

interface LoginInterface {
  name: string;
}
export default class Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  route!: { params: LoginInterface };
}
