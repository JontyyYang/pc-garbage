import { Effect } from 'dva';
import { Reducer } from 'redux';
import cookie from 'js-cookie';

// 不从mook走了
// import { queryCurrent, query as queryUsers } from '@/services/user';
import { query as queryUsers } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  manage_name?: string;
  manage_id?: number;
  // 注释的都是原来mook的数据类型
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    // effects 是通过接口对外暴露的，利用dispatch使用
    // call是调用接口， put是调用reduce
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      // const response = yield call(queryCurrent, payload);
      const response = { data: JSON.parse(cookie.get('manageInfo')) };
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    // reducers返回的是一个新的state，因为为了避免影响其他的state，所以必须有...state
    // 是通过effect里面触发
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
