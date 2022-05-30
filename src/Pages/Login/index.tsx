import Utils from '@/Utils';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Base from '../Base';
import GlobalVar from '@/GlobalVar';
import { Props } from './Props';
import { State } from './State';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'teaset';
import Http from '@/Library/Http/Login';

export default class Login extends Base<Props, State> {
  phoneNumber: string = '';
  constructor(props: Props) {
    super(props);
    GlobalVar.comingCustomServicePage = true;
    // 初始化组件状态
    this.state = {
      mobile: '',
      password: '',
    };
  }

  componentDidMount() {}

  render() {
    const { mobile, password } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <View style={styles.loginItem}>
            <Text style={styles.text}>账号</Text>
            <TextInput
              style={styles.textInput}
              maxLength={11}
              placeholder="请输入手机号码"
              value={mobile}
              onChangeText={(value) => {
                this.setState({ mobile: value });
              }}
            />
          </View>
          <View style={styles.loginItem}>
            <Text style={styles.text}>密码</Text>
            <TextInput
              style={styles.textInput}
              maxLength={11}
              placeholder="请输入密码"
              secureTextEntry={true}
              value={password}
              onChangeText={(value) => {
                this.setState({ password: value });
              }}
            />
          </View>
          <Button
            type="primary"
            style={styles.button}
            onPress={() => this.login()}
            title="登 录"
          />
          <Button
            type="default"
            style={[styles.button, styles.registerButton]}
            onPress={() => this.toRegister()}
            title="还没有账号？去注册"
          />
        </View>
      </View>
    );
  }

  // 登录
  async login() {
    const { mobile, password } = this.state;
    console.log(mobile, '手机号码');
    console.log(password, '密码');
    // let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
    // if (!reg.test(mobile)) {
    //   Utils.showToast('请填写正确的11位手机号码');
    //   return;
    // }
    // if (password.length < 6) {
    //   Utils.showToast('请输入6个字符以上的密码');
    //   return;
    // }
    // const params = {
    //   mobile,
    //   password,
    // };
    // const data = await Http.login(params);
    // console.log(data, '登录');
    // if (data.code === 200) {
    //   Utils.showToast(
    //     '欢迎您,' + (data.data.Name || data.data.NickName || data.data.Mobile),
    //   );
    //   GlobalVar.token = data.data.SessionToken;
    //   GlobalVar.UserInfo = data.data;
    //   this.props.navigation.navigate('Home');
    // } else {
    //   Utils.showToast(data.msg);
    // }
    GlobalVar.UserInfo = {
      name: mobile,
      nickName: mobile,
    };
    this.props.navigation.navigate('Home', { name: mobile });
  }

  // 跳转注册
  toRegister() {
    this.props.navigation.navigate('Register', { name: mobile });
  }

  // 点击导航栏回退
  goBack = (): void => {
    this.nativeGoBack();
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    paddingBottom: Utils.scaleSize(12),
    alignItems: 'center',
  },
  loginBox: {
    width: Utils.scaleSize(280),
    marginTop: Utils.scaleSize(150),
  },
  loginItem: {
    marginTop: Utils.scaleSize(30),
  },
  text: {
    marginBottom: Utils.scaleSize(5),
    color: '#999',
    fontSize: Utils.scaleSize(14),
  },
  textInput: {
    height: Utils.scaleSize(40),
    fontSize: Utils.scaleSize(18),
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  button: {
    height: Utils.scaleSize(40),
    marginTop: Utils.scaleSize(40),
    borderEndWidth: 0,
    borderRadius: Utils.scaleSize(8),
  },
  registerButton: {
    marginTop: Utils.scaleSize(20),
  },
});
