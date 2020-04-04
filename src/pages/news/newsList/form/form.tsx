import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';

// interface hor {
//   form: any;
// }
interface textInfoProps {
  form: FormComponentProps['form'];
  onGetData?: (changedFields: object) => void;
}

class HorizontalLoginForm extends Component<textInfoProps> {
  constructor(props: textInfoProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { form } = this.props;
    form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line;
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    const titleError = isFieldTouched('title') && getFieldError('title');
    const writenameError = isFieldTouched('writename') && getFieldError('writename');
    const picUrlError = isFieldTouched('picurl') && getFieldError('picurl');
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Form.Item
          validateStatus={titleError ? 'error' : ''}
          help={titleError || ''}
          label="标题名"
        >
          {getFieldDecorator('title', {
            initialValue: '标题',
            rules: [{ required: true, message: '请输入文章标题哦！' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="title"
            />,
          )}
        </Form.Item>
        <Form.Item
          validateStatus={writenameError ? 'error' : ''}
          help={writenameError || ''}
          label="作者名"
        >
          {getFieldDecorator('writename', {
            initialValue: '作者',
            rules: [{ required: true, message: '请输入你的名字哦！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="writename"
            />,
          )}
        </Form.Item>

        <Form.Item
          validateStatus={picUrlError ? 'error' : ''}
          help={picUrlError || ''}
          label="图片地址"
        >
          {getFieldDecorator('picurl', {
            initialValue: '图片地址',
            rules: [{ required: true, message: '输入图片地址哦！' }],
          })(
            <Input
              prefix={<Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="图片地址"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

const NewsListForm = Form.create<textInfoProps>({
  name: 'horizontal_login',
  onFieldsChange(props, changedFields) {
    (props as any).onGetData(changedFields);
  },
})(HorizontalLoginForm);

export default NewsListForm;
