import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Icon } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import SelectLang from '@/components/SelectLang';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>马上达资源回收中心</span>
              </Link>
            </div>
            <div className={styles.desc}>做最快捷最方便的居民资源回收中心</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="NanTong University 苏ICP备05007127号"
          links={[
            {
              key: '马上达资源回收中心',
              title: '马上达资源回收中心',
              href: 'https://pro.ant.design',
              blankTarget: true,
            },
            {
              key: 'github',
              title: <Icon type="github" />,
              href: 'https://github.com/YJD199798/pc-garbage',
              blankTarget: true,
            },
            {
              key: 'yuque',
              title: '个人博客',
              href: 'https://www.yuque.com/jontyy',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
