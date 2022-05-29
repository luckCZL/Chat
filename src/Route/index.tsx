import * as React from 'react';

import Home from '@/Pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import store from '@/Store';
import { Provider } from 'mobx-react';
import { Platform, StyleSheet, View, StatusBar, Text } from 'react-native';
import * as Config from '@/Utils/config';
import Login from '@/Pages/Login';
import Chat from '@/Pages/Chat';
import Register from '@/Pages/Login/Register';
import Navigation from '@/Components/Navigation';
import Utils from '@/Utils';
import GlobalVar from '@/GlobalVar';
const Stack = createStackNavigator();

interface Props {
  env: string;
}

export default function App() {
  // 更改toast样式
  Config.init();
  return (
    <View style={styles.ViewHome}>
      <View style={styles.containterBox}>
        <Provider {...store}>
          {/* <TopView> */}
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              headerMode="none"
              screenOptions={() => ({
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
              })}>
              <Stack.Screen
                name="Home"
                component={Home}
                initialParams={{
                  title: '首页',
                  isNavigation: true,
                }}
              />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
          </NavigationContainer>
          {/* </TopView> */}
        </Provider>
      </View>
      {GlobalVar.isNavigation && <Navigation style={styles.navigation} />}
    </View>
  );
}
const styles = StyleSheet.create({
  ViewHome: {
    flex: 1,
    backgroundColor: '#e9eef1',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 33,
  },
  containterBox: {
    flex: 1,
  },
  navigation: {
    width: '100%',
    height: Utils.scaleSize(60),
  },
});
