import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch, AnyAction } from 'redux';
import { Row, Col, Card, Button, Table, Modal, message } from 'antd';
import style from './index.less';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import AddSwiperForm from './addSwiperForm/index';

interface swiperPropsType {
  dispatch?: Dispatch<AnyAction>;
  swiper: { swiperList: { img_id: number; img_src: string }[] };
}

interface stateType {
  showModel: boolean;
  url: { name: string; value: string };
  initValue: string | boolean;
  isEdit: boolean;
  img_id?: number;
}

interface paramsType {
  url: string;
  img_id: any;
}

class Swiper extends React.Component<swiperPropsType> {
  state: stateType = {
    showModel: false,
    url: {
      value: '',
      name: '',
    },
    initValue: '',
    isEdit: false,
  };
  async componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      await dispatch({
        type: 'swiper/getSwiperList',
      });
    }
  }

  onedit = async record => {
    this.setState({
      initValue: record.img_src,
      showModel: true,
      isEdit: true,
      img_id: record.img_id,
    });
  };

  ondelete = async img_id => {
    let status;
    const { dispatch } = this.props;
    if (dispatch) {
      status = await dispatch({
        type: 'swiper/deleteSwiper',
        payload: img_id,
      });
      if (status.data.code === 0) {
        this.setState({ showModel: false });
        message.info('删除成功');
        dispatch({
          type: 'swiper/getSwiperList',
        });
      }
    }
  };
  addSwiper = () => {
    this.setState({
      showModel: true,
      isEdit: false,
    });
  };

  handleOk = async () => {
    const { url, isEdit } = this.state;
    const { dispatch } = this.props;
    let status;
    let params: paramsType = {
      url: url.value,
      img_id: 0,
    };
    if (dispatch) {
      if (isEdit) {
        const { img_id } = this.state;
        params.img_id = img_id;
        status = await dispatch({
          type: 'swiper/editSwiperList',
          payload: params,
        });
      } else {
        status = await dispatch({
          type: 'swiper/addSwiperList',
          payload: params,
        });
      }

      if (status.data.code === 0) {
        this.setState({ showModel: false });
        message.info('添加成功');
        dispatch({
          type: 'swiper/getSwiperList',
        });
      }
    }
  };

  handleCancel = () => {
    this.setState({
      showModel: false,
    });
  };

  onGetData = e => {
    const { url = {} } = e;
    if (url.value) {
      this.setState({ url });
    }
  };

  render() {
    const {
      swiper: { swiperList },
    } = this.props;
    const { showModel } = this.state;
    const columns = [
      {
        title: '图片id',
        dataIndex: 'img_id',
        key: 'img_id',
      },
      {
        title: '图片',
        dataIndex: 'img_src',
        key: 'img_src',
        align: 'center',
        render: img_src => <img src={img_src} style={{ width: '300px', height: '200px' }} />,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const { img_id } = record;
          return (
            <span>
              <a style={{ marginRight: 16 }} onClick={() => this.onedit(record)}>
                编辑
              </a>

              <a style={{ marginRight: 16 }} onClick={() => this.ondelete(img_id)}>
                删除
              </a>
            </span>
          );
        },
      },
    ];
    return (
      <PageHeaderWrapper content="这里可以设置移动端看到的轮播图广告">
        <div className={style.container}>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="已发布新闻数" bordered={false}>
                <div className={style.published}>
                  <p>当前已发布{swiperList.length}条，建议不超过 8 条哦</p>
                  <Button type="primary" shape="round" onClick={this.addSwiper}>
                    +
                  </Button>
                  <Modal
                    visible={showModel}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                  >
                    <AddSwiperForm
                      onGetData={this.onGetData}
                      initValue={this.state.isEdit ? this.state.initValue : ''}
                    />
                  </Modal>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <Table columns={columns} dataSource={swiperList} />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ swiper }: ConnectState) => ({
  swiper,
}))(Swiper);
