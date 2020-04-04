import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch, AnyAction } from 'redux';
import { Row, Col, Card } from 'antd';
import style from './index.less';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

interface swiperPropsType {
  dispatch?: Dispatch<AnyAction>;
}

class Swiper extends React.Component<swiperPropsType> {
  async componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      await dispatch({
        type: 'swiper/getSwiperList',
      });
      console.log(this.props);
    }
  }

  render() {
    return (
      <PageHeaderWrapper content="这里可以设置移动端看到的轮播图广告">
        <div className={style.container}>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="已发布新闻数" bordered={false} style={{ width: 300 }}>
                <p>Card1 content</p>
                <p>Card2 content</p>
                <p>Card3 content</p>
              </Card>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ swiper }: ConnectState) => ({
  swiper,
}))(Swiper);
