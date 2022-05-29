import Utils from '@/Utils';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GlobalVar from '@/GlobalVar';
import { Props } from './Props';
import { State } from './State';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'teaset';
import Base from '@/Pages/Base';
import Http from '@/Library/Http/Login';

export default class Register extends Base<Props, State> {
  phoneNumber: string = '';
  constructor(props: Props) {
    super(props);
    GlobalVar.comingCustomServicePage = true;
    // 初始化组件状态
    this.state = {
      mobile: '',
      password: '',
      passwordSure: '',
    };
  }

  componentDidMount() {}

  render() {
    const { mobile, password, passwordSure } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.registerBox}>
          <View style={styles.registerItem}>
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
          <View style={styles.registerItem}>
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
          <View style={styles.registerItem}>
            <Text style={styles.text}>确认密码</Text>
            <TextInput
              style={styles.textInput}
              maxLength={11}
              placeholder="请确认密码"
              secureTextEntry={true}
              value={passwordSure}
              onChangeText={(value) => {
                this.setState({ passwordSure: value });
              }}
            />
          </View>
          <Button
            type="primary"
            style={styles.button}
            onPress={() => this.register()}
            title="注 册"
          />
          <Button
            type="default"
            style={[styles.button, styles.registerButton]}
            onPress={() => this.toLogin()}
            title="已有账号？去登录"
          />
        </View>
      </View>
    );
  }

  // 注册
  async register() {
    const { mobile, password, passwordSure } = this.state;
    let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
    if (!reg.test(mobile)) {
      Utils.showToast('请填写正确的11位手机号码');
      return;
    }
    if (password.length < 6) {
      Utils.showToast('请输入6个字符以上的密码');
      return;
    }
    if (password !== passwordSure) {
      Utils.showToast('两个密码不一致');
      return;
    }
    const params = {
      mobile,
      password,
    };
    const data = await Http.register(params);
    console.log(data, '注册');
    if (data.code === 200) {
      Utils.showToast('注册成功，正在为您自动登录登录');
      GlobalVar.token = data.data.SessionToken;
      GlobalVar.UserInfo = data.data;
      setTimeout(() => {
        this.props.navigation.navigate('Home');
      });
    } else {
      Utils.showToast(data.msg);
    }
    console.log(data, '注册');
    // this.props.navigation.navigate('Login');
  }

  // 跳转登录
  toLogin() {
    this.props.navigation.navigate('Login');
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
  registerBox: {
    width: Utils.scaleSize(280),
    marginTop: Utils.scaleSize(120),
  },
  registerItem: {
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
