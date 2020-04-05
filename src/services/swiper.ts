import api from '@/utils/api';

export async function getSwiper() {
  return api.get('/pc/swiper/img');
}

export async function addSwiper(params: string) {
  return api.post('/pc/swiper/addSwiper', {
    data: params,
  });
}

export async function deleteSwiper(swiper_id: number) {
  return api.post('/pc/swiper/deleteSwiper', {
    data: swiper_id,
  });
}

export async function editSwiper(params: string) {
  return api.post('/pc/swiper/editSwiper', {
    data: params,
  });
}
