import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

interface swiperProps {
  form: FormComponentProps['form'];
  onGetData?: (changedFields: object) => void;
  initValue: string;
}

class AddSwiperFormDetail extends Component<swiperProps> {
  constructor(props: swiperProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    const urlError = isFieldTouched('url') && getFieldError('url');
    const { initValue } = this.props;
    return (
      <Form name="basic">
        <Form.Item
          validateStatus={urlError ? 'error' : ''}
          help={urlError || ''}
          label="广告图片地址"
        >
          {getFieldDecorator('url', {
            initialValue: initValue ? initValue : '',
            rules: [{ required: true, message: '请输入广告图片地址哦！' }],
          })(<Input placeholder="url" />)}
        </Form.Item>
      </Form>
    );
  }
}

const AddSwiperForm = Form.create<swiperProps>({
  name: 'add_swiper_form',
  onFieldsChange(props, changedFields) {
    (props as any).onGetData(changedFields);
  },
})(AddSwiperFormDetail);
export default AddSwiperForm;
