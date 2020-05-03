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
