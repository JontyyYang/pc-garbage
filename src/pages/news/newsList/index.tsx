import React, { Component } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Dispatch, AnyAction } from 'redux';
import { Card, Col, Row, Button, Modal, message, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newsListType } from '@/models/newsList';
import { formatTime } from '@/utils/date-transform';

import NewsListForm from './form/form';
import styles from './index.less';

// 这里定义state的状态
interface State {
  texttips: string[];
  loading: boolean;
  visible: boolean;
  value: string;
  onGetData?: any;
  title: {
    value: string;
  };
  writename: {
    value: string;
  };
  picurl: {
    value: string;
  };
}

// 这里定义props状态 ，注意，也就是下面 connectState中用到的
interface newsListProps {
  dispatch?: Dispatch<AnyAction>;
  newsList: newsListType;
}

class NewsList extends Component<newsListProps, State> {
  state: State = {
    texttips: ['累计编写新闻', '累计发布新闻'],
    loading: false,
    visible: false,
    value: 'test',
    title: { value: '' },
    writename: { value: '' },
    picurl: { value: '' },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'newsList/getNewsList',
      });
    }
  }

  // modal
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    this.setState({ loading: true });
    // 这里不需要定义类型，因为this.state里面类型已经定义好了，下面的params一样
    const { title, writename, value, picurl } = this.state;
    // params不需要定义类型是因为要他们分别从title中拿取数据， 而他们的类型是this.state里面的， state里面是有类型定义的
    const params = {
      title: title.value,
      writename: writename.value,
      picurl: picurl.value,
      info: value,
    };

    if (!params.title || !params.writename || !params.info || !params.picurl) {
      this.setState({ loading: false, visible: false });
      message.info('填报的数据有错误哦。请修改再重新提交');
      return;
    }

    const { dispatch } = this.props;
    let status;

    if (dispatch) {
      status = await dispatch({
        type: 'newsList/addNewsList',
        payload: params,
      });

      if (status.data.code === 0) {
        this.setState({ loading: false, visible: false });
        message.info('添加成功');
        dispatch({
          type: 'newsList/getNewsList',
        });
      }
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleChange = value => {
    this.setState({
      value,
    });
  };

  onGetData = e => {
    const { title = {}, writename = {}, picurl = {} } = e;
    if (title.value) {
      this.setState({ title });
    }
    if (writename.value) {
      this.setState({ writename });
    }
    if (picurl.value) {
      this.setState({ picurl });
    }
  };

  onDelete = async id => {
    const { dispatch } = this.props;
    await (dispatch &&
      dispatch({
        type: 'newsList/deleteNewsList',
        payload: id,
      }));
  };

  // edit = record => {
  //   console.log(JSON.stringify(record));
  //   const { news_title, news_writename, news_picurl, news_info } = record;
  //   const title = { ...this.state.title, ...news_title };
  //   this.setState({
  //     visible: true,
  //     title: { value: news_title },
  //     value: news_info,
  //     picurl: { value: news_picurl },
  //     writename: { value: news_writename },
  //   });
  // };

  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'news_title',
        key: 'news_title',
      },
      {
        title: '作者',
        dataIndex: 'news_writename',
        key: 'news_writename',
      },
      {
        title: '图片',
        dataIndex: 'news_picurl',
        key: 'news_picurl',
        render: src => <img src={src} alt="背景图片" />,
      },
      {
        title: '时间',
        dataIndex: 'news_time',
        key: 'news_time',
        render: time => <p>{formatTime(time)}</p>,
      },
      {
        title: '内容',
        key: 'news_info',
        dataIndex: 'news_info',
        width: '200px',
      },
      {
        title: '操作',
        key: 'action',
        render: record => {
          const { id } = record;
          return (
            <span>
              {/* <a style={{ marginRight: 16 }} onClick={() => this.edit(record)}>
                编辑
              </a> */}
              <a style={{ marginRight: 16 }} onClick={() => this.onDelete(id)}>
                删除
              </a>
            </span>
          );
        },
      },
    ];
    const { newsList: news } = this.props.newsList;
    const { texttips, visible, loading } = this.state;
    const { data: userdata } = news;
    const totalNum = userdata && userdata.length;
    const published =
      userdata && userdata.filter(item => Number.parseInt(item.is_delete, 10) === 0);
    const publishedNum = published && published.length;
    return (
      <PageHeaderWrapper content="你可以在这个页面添加、编辑、查看新闻哦">
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col sm={11} xs={24}>
              <Card title="新闻总数" bordered={false}>
                {texttips[0]}
                <span className={styles.numColor}>
                  {' '.repeat(1)}
                  {totalNum}
                  {' '.repeat(1)}
                </span>
                条
              </Card>
            </Col>

            <Col sm={11} xs={24}>
              <Card title="已发布的新闻数" bordered={false}>
                {texttips[1]}
                {' '.repeat(1)}
                <span className={styles.numColor}>{publishedNum}</span>
                {' '.repeat(1)}条
              </Card>
            </Col>

            <Col sm={2} xs={24}>
              <div>
                <div>点击这里编写新闻哦</div>
                <Button type="primary" onClick={this.showModal} shape="round">
                  +
                </Button>
                <Modal
                  visible={visible}
                  title="增加新闻"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      取消
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                      提交
                    </Button>,
                  ]}
                >
                  <NewsListForm onGetData={this.onGetData} />
                  <Card title="富文本编辑器">
                    <ReactQuill value={this.state.value} onChange={this.handleChange} />
                  </Card>
                </Modal>
              </div>
            </Col>
          </Row>
        </div>
        <Table columns={columns} dataSource={published} rowKey={item => item.id} />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ newsList }: ConnectState) => ({
  newsList,
}))(NewsList);
// 最下面的这个  是组件名
/* eslint-enable */
