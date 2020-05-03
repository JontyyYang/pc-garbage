// import { Reducer } from 'redux';

import { Effect } from 'dva';
import { addGoods } from '@/services/goods';

import { message } from 'antd';

export interface goodsType {
  goodsName: string;
  goodsImg: string;
  goodsNumL: string;
  goodsPrice: string;
}

export interface goodsModelType {
  namespace: string;
  state: goodsType;
  effects: {
    addGoods: Effect;
  };
  // reducers: {
  //   changeNewsList: Reducer<goodsType>;
  // };
}

const Model: goodsModelType = {
  namespace: 'good',

  state: {
    goodsName: '',
    goodsImg: '',
    goodsNumL: '',
    goodsPrice: '',
  },

  effects: {
    *addGoods({ payload }, { call }) {
      console.log(payload);
      const result = yield call(addGoods, payload);

      return result;
    },
  },

  // reducers: {
  // changeNewsList(state, { payload }) {
  //   return {
  //     ...state,
  //     ...{ newsList: payload.data },
  //   };
  // },
  // },
};
export default Model;
