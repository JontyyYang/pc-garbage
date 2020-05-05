import api from '@/utils/api';

export interface GoodsType {
  goodsName: string;
  goodsImg: string;
  goodsNumL: string;
  goodsPrice: string;
}

export async function addGoods(params: GoodsType) {
  return api.post('/pc/good/addGoods', {
    data: params,
  });
}

export async function getGoods() {
  return api.get('/pc/good/getGoods');
}

export async function deleteGoods(params: number | string) {
  return api.post('/pc/good/deleteGoods', {
    data: params,
  });
}

export async function getOneGood(params: number | string) {
  return api.get('/pc/good/getOneGood', {
    params: {
      good_id: params,
    },
  });
}

export async function updateGoods(params: GoodsType) {
  return api.post('/pc/good/updateGoods', {
    data: params,
  });
}
