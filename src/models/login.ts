import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';

import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  code?: number;
  data?: object;
  message?: string;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {},

  //   effect：
  // 当put一个action后，reducer中就会计算新的state并返回，注意： put 也是阻塞 effect。
  // call(fn, …args)：
  // 调用其他函数的函数，它命令 middleware 来调用fn 函数， args为函数的参数
  // 注意： fn 函数可以是一个 Generator 函数，也可以是一个返回 Promise 的普通函数，call 函数也是阻塞 effect。
  effects: {
    *login({ payload }, { call, put }) {
      // call函数应该是调用接口
      const { data: response } = yield call(fakeAccountLogin, payload);
      // put函数是用来发送action的
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === 0) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
        // router.replace({
        //   pathname: '/welcome',
        //   search: stringify({
        //     redirect: window.location.href,
        //   }),
        // });
      }
    },

    *getCaptcha({ payload }, { call }) {
      const data = yield call(getFakeCaptcha, payload);
      return data;
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const data = payload.data;
      setAuthority(data.currentAuthority);
      return {
        ...state,
        data,
      };
    },
  },
};

export default Model;
