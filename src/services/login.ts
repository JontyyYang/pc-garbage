// import request from '@/utils/request';
import api from '@/utils/api';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return api.post('/pc/manage/manage', {
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  // return api.get('/pc/manage/getFakeCaptcha', {
  // params: {
  //   mobile: mobile,
  // },
  // });
  return api(`/api/login/captcha?mobile=${mobile}`);
}
