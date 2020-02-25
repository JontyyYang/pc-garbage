// import request from '@/utils/request';
import api from '@/utils/api';

export async function query(): Promise<any> {
  return api('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return api('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return api('/api/notices');
}
