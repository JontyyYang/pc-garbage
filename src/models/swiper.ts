import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getSwiper } from '@/services/swiper';

export interface SwiperModelType {
  namespace: string;
  state: {
    img_id?: number;
    img_src?: string;
  }[];
  effects: {
    getSwiperList: Effect;
  };
  reducers: {
    initSwiper: Reducer;
  };
}

const SwiperModel: SwiperModelType = {
  namespace: 'swiper',

  state: {
    swiperList: [],
  },

  effects: {
    *getSwiperList({ payload }, { call, put }) {
      const result = yield call(getSwiper, payload);
      yield put({
        type: 'initSwiper',
        payload: result.data,
      });
      return result;
    },
  },

  reducers: {
    initSwiper(state, { payload }) {
      return {
        ...state,
        swiperList: payload.imgData,
      };
    },
  },
};

export default SwiperModel;
