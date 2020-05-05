import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography, Modal } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';

import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface GoodsProps {
  good: any;
  dispatch: Dispatch<any>;
  loading: boolean;
  history: any;
}
interface GoodsState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

class Goods extends Component<GoodsProps, GoodsState> {
  state = { visible: false, goodInfo: {} };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async e => {
    const { dispatch } = this.props;
    const { goodInfo } = this.state;
    this.setState({
      visible: false,
    });
    const status = await dispatch({
      type: 'good/deleteGoods',
      payload: goodInfo.good_id,
    });
    if (status.data.code === 0) {
      dispatch({
        type: 'good/getGoods',
      });
    }
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'good/getGoods',
    });
  }

  addGoods = () => {
    this.props.history.push('/goods/addgoods');
  };

  delete = goods_info => {
    this.showModal();
    this.setState({
      goodInfo: goods_info,
    });
  };

  edit = goods_info => {
    this.props.history.push(`/goods/editgoods/${goods_info.good_id}`);
  };

  render() {
    const { good, loading } = this.props;
    const data = good.data || [];

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>你可以在当前页查看所有的商品信息哦， 并相应的操作这些商品</p>
      </div>
    );

    // 右侧图标信息，很不错哦
    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageHeaderWrapper content={content} extraContent={extraContent}>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>确定要删除这个商品吗</p>
        </Modal>
        <div className={styles.cardList}>
          <List
            rowKey="good_id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...data, []]}
            renderItem={item => {
              if (item && item.good_id) {
                return (
                  <List.Item key={item.good_id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[
                        <a key="option1" onClick={this.delete.bind(this, item)}>
                          删除
                        </a>,
                        <a key="option2" onClick={this.edit.bind(this, item)}>
                          编辑
                        </a>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.good_img} />}
                        title={<a>{item.good_name}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            <p>介绍：{item.good_info}</p>
                            <p>价钱：{item.good_price}</p>
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={this.addGoods}>
                    <PlusOutlined /> 新增商品
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    goods,
    loading,
    good,
  }: {
    goods: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
    good: Array;
  }) => ({
    goods,
    loading: loading.models.goods,
    good,
  }),
)(Goods);
