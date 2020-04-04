import { Reducer } from 'redux';
import { Effect } from 'dva';
import { addNews, getNews, deleteNews } from '@/services/newsList';
import { message } from 'antd';

export interface newsDataType {
  is_delete: string;
  id: string;
}
// 对外暴露给connect.d.ts用的。 用来说明connectState的类型
export interface newsListType {
  newsList: {
    code?: number;
    data?: newsDataType[];
    message?: string;
  };
}

// 暴露给Model用，用来表示导出的类型
export interface newsListModelType {
  namespace: string;
  state: newsListType;
  effects: {
    getNewsList: Effect;
    addNewsList: Effect;
    deleteNewsList: Effect;
  };
  reducers: {
    changeNewsList: Reducer<newsListType>;
  };
}

const Model: newsListModelType = {
  namespace: 'newsList',

  state: {
    newsList: {
      code: 0,
      data: [],
      message: '',
    },
  },

  effects: {
    *getNewsList({ payload }, { call, put }) {
      const result = yield call(getNews, payload);

      yield put({
        type: 'changeNewsList',
        payload: result,
      });
    },

    *addNewsList({ payload }, { call }) {
      const result = yield call(addNews, payload);

      return result;
    },

    *deleteNewsList({ payload }, { call, put }) {
      const result = yield call(deleteNews, payload);

      if (result.data.code === 0) {
        yield put({
          type: 'changeNewsList',
          payload: result,
        });

        message.info('删除新闻成功');
      }
    },
  },

  reducers: {
    changeNewsList(state, { payload }) {
      return {
        ...state,
        ...{ newsList: payload.data },
      };
    },
  },
};
export default Model;
