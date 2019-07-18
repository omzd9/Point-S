import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Select, Input, Button, Icon, Upload, message, notification, DatePicker } from 'antd';
import { createRequete } from '../util/APIUtils'

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

class AddRequete extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const requete = Object.assign({}, values);

              createRequete(requete)
                .then(response => {
                  message.success("requete envoyer");
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Polling App',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });                    
                    } else {
                        notification.error({
                            message: 'Polling App',
                            description: JSON.stringify(requete)
                        });                                            
                    }
                });
            }
    });
  };

  handleSelectChange = value => {
    //this.props.form.setFieldsValue();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
        
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item label="Departemet">
          {getFieldDecorator('depatement', {
            rules: [{ required: true, message: 'Entrer le departement' }],
          })(
            <Select
              placeholder="Choisir le departement"
              onChange={this.handleSelectChange}
            >
              <Option value="dep1">departement 1</Option>
              <Option value="dep2">departement 2</Option>
              <Option value="dep3">departement 3</Option>
              <Option value="dep4">departement 4</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Objet">
            {getFieldDecorator('object', {
                rules: [{ required: true, message: 'Entrer l\'objet' }],
            })(<Input />)}
        </Form.Item>
        
        <Form.Item label="Corps">
            {getFieldDecorator('body', {
                rules: [{ required: true, message: 'Entrer le corps du requete' }],
            })(<TextArea rows={4}/>)}
        </Form.Item>

        <Form.Item label="Délai">
            {getFieldDecorator('delai', {
                rules: [{ required: true, message: 'Entrer le délai du requete' }],
            })(<DatePicker/>)}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRequete = Form.create({ name: 'coordinated' })(AddRequete);
export default WrappedRequete;