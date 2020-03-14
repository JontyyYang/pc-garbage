import api from '@/utils/api';

export interface addNewsPara {
  title: {
    value: string;
  };
  writename: {
    value: string;
  };
  picurl: {
    value: string;
  };
  info: object;
}

export async function addNews(params: addNewsPara) {
  return api.post('/pc/newsList/addNewlist', {
    data: params,
  });
}

export async function getNews() {
  return api.get('/pc/newsList/getNewList');
}

export async function deleteNews(params: number) {
  return api.post('/pc/newsList/deleteNews', {
    data: params,
  });
}
