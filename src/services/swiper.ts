import api from '@/utils/api';

export async function getSwiper() {
  return api.get('/pc/swiper/img');
}
