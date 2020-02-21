import { Button, Result } from 'antd';
import React from 'react';
import { router } from 'umi';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="网页找不到啦"
    subTitle="你进入到错误的网址啦， 请返回首页或者重新登录进行操作哦"
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        点我点我，回到首页哦
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
