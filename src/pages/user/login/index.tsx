// antd组件引入
import { Alert, Checkbox } from 'antd';
// umi的格式化字符串的，支持多语言用的，其它页面就不需要了， 首页的懒得删了
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
// react的核心模块
import React, { Component } from 'react';
// 应该是监听checkbox是否被选中的，估计也是antd的bc导致的，所以要单独引入
import { CheckboxChangeEvent } from 'antd/es/checkbox';
// redux中修改数据的
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

// 定义接口， 有dispatch，userLogin，submitting字段，类型分别是redux的dispatch，statetype，布尔值
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting?: boolean;
}
// 登录状态，分别是类型， 和是否自动登录
interface LoginState {
  type: string;
  autoLogin: boolean;
}

//  extrends Component，
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  // 初始状态， loginstate接口
  state: LoginState = {
    type: 'account',
    autoLogin: true,
  };

  // 点击选择框，改变autologin的值
  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  // 点击登录，调用LoginComponents组件的handlesubmit方法， 得到组件的输入框的值，然后执行当前的handlesubmit
  handleSubmit = (err: unknown, values: LoginParamsType) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      // 由于connect绑定了login
      dispatch({
        //这里的login是model的命名空间，"/"后面的表示model中login的异步方法名
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  // 切换tab，使用账户密码登录还是验证码登录
  onTabChange = (type: string) => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise<boolean>((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }
      this.loginForm.validateFields(
        ['mobile'],
        {},
        async (err: unknown, values: LoginParamsType) => {
          if (err) {
            reject(err);
          } else {
            const { dispatch } = this.props;
            try {
              const success = await ((dispatch({
                type: 'login/getCaptcha',
                payload: values.mobile,
              }) as unknown) as Promise<unknown>);
              resolve(!!success);
            } catch (error) {
              reject(error);
            }
          }
        },
      );
    });

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    // 这里的userLogin，submitting就是底部connect得到的
    const { userLogin = {}, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'user-login.login.tab-login-credentials' })}>
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-credentials' }),
              )}
            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}: admin or user`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}: ant.design`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'user-login.login.tab-login-mobile' })}>
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-verification-code' }),
              )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({ id: 'user-login.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'user-login.phone-number.wrong-format' }),
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={formatMessage({ id: 'user-login.verification-code.placeholder' })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({ id: 'user-login.form.get-captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'user-login.captcha.second' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.verification-code.required' }),
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

// 1. connect 方法返回的也是一个 React 组件，通常称为容器组件。
// 2. 因为它是原始 UI 组件的容器，即在外面包了一层 State。
// 3. connect 方法传入的第一个参数是 mapStateToProps 函数，该函数需要返回一个对象，用于建立 State 到 Props 的映射关系。
// 4. 简而言之，connect接收一个函数，返回一个函数。
// 5. 第一个函数会注入全部的models，你需要返回一个新的对象，挑选该组件所需要的models。
// 所以这里本质是， 把model中的login和loading中拿取相应的数据， 按照connectState，也就是connect.d.ts里规定的格式返回
export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
