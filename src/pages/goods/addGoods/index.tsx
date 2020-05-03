import { connect } from 'dva';
import { Dispatch } from 'redux';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ConnectState } from '@/models/connect';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface AddGoodsProps {
  form: FormComponentProps['form'];
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class AddGoods extends Component<AddGoodsProps> {
  constructor(props, context) {
    super(props, context);
  }

  handleSubmit = async e => {
    e.preventDefault();
    const params = await this.props.form.validateFields((err, values) => {
      if (err) {
        // eslint-disable-next-line;
        message.info('表单有错误');
      }
    });
    const { dispatch } = this.props;
    let status;

    if (dispatch) {
      status = await dispatch({
        type: 'good/addGoods',
        payload: params,
      });
    }

    if (status.data.code === 0) {
      message.info('添加商品成功，可以继续添加新商品');
      this.props.form.resetFields();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <PageHeaderWrapper content="你可以在当前页面添加商品">
        <Form {...layout} name="addGoods" onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称" name="goodsName">
            {getFieldDecorator('goodsName', {
              rules: [{ required: true, message: '请输入商品名称' }],
            })(<Input placeholder="goodsName" />)}
          </Form.Item>

          <Form.Item label="商品图案" name="goodsImg">
            {getFieldDecorator('goodsImg', {
              rules: [{ required: true, message: '请输入商品图案' }],
            })(<Input placeholder="goodsImg" />)}
          </Form.Item>

          <Form.Item label="商品数量" name="goodsNum">
            {getFieldDecorator('goodsNum', {
              rules: [{ required: true, message: '请输入商品数量' }],
            })(<Input placeholder="goodsNum" />)}
          </Form.Item>

          <Form.Item label="商品价格" name="goodsPrice">
            {getFieldDecorator('goodsPrice', {
              rules: [{ required: true, message: '请输入商品价钱' }],
            })(<Input placeholder="goodsPrice" />)}
          </Form.Item>

          <Form.Item label="商品介绍" name="goodsInfo">
            {getFieldDecorator('goodsInfo', {
              rules: [{ required: true, message: '请输入商品介绍' }],
            })(<Input placeholder="goodsInfo" />)}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    );
  }
}

// export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
//   submitting: loading.effects['goodsAndaddGoods/submitRegularForm'],
// }))(Form.create({ name: 'addGoods' })(AddGoods));

export default connect(({ good }: ConnectState) => ({
  good,
}))(Form.create({ name: 'addGoods' })(AddGoods));
