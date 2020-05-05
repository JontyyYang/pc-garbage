import { Reducer } from 'redux';
import { Effect } from 'dva';
import { addGoods, getGoods, deleteGoods, getOneGood, updateGoods } from '@/services/goods';
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
    deleteGoods: Effect;
    getOneGood: Effect;
    updateGoods: Effect;
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

    *deleteGoods({ payload }, { call, put }) {
      const result = yield call(deleteGoods, payload);
      return result;
    },

    *getOneGood({ payload }, { call }) {
      const result = yield call(getOneGood, payload);
      return result;
    },

    *updateGoods({ payload }, { call }) {
      const result = yield call(updateGoods, payload);
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
