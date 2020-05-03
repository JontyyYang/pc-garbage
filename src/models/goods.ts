import { Reducer } from 'redux';
import { Effect } from 'dva';
import { addGoods, getGoods } from '@/services/goods';
// import { message } from 'antd';

export interface goodsType {
  goodsName: string;
  goodsImg: string;
  goodsNumL: string;
  goodsPrice: string;
  goodsInfo: string;
}

export interface goodsModelType {
  namespace: string;
  state: goodsType[];
  effects: {
    addGoods: Effect;
    getGoods: Effect;
  };
  reducers: {
    changeGoods: Reducer<goodsType>;
  };
}

const Model: goodsModelType = {
  namespace: 'good',

  state: [],

  effects: {
    *addGoods({ payload }, { call }) {
      const result = yield call(addGoods, payload);

      return result;
    },

    *getGoods({ payload }, { call, put }) {
      const result = yield call(getGoods);
      yield put({
        type: 'changeGoods',
        payload: result,
      });
      return result;
    },
  },

  reducers: {
    changeGoods(state, { payload }) {
      return {
        ...state,
        ...payload.data,
      };
    },
  },
};
export default Model;
