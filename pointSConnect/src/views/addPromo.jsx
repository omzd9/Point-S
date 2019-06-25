import React, { Component } from 'react';

import '../assets/css/addEvent.css';
import { createPromo } from '../util/APIUtils';

import { Form, Input, DatePicker,Button,notification } from 'antd';
const FormItem = Form.Item;

class addPromo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            file: {
                value: ''
            },
           
            date: {
                value: ''
            },
           
        }
      
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.FileUploadchange=this.FileUploadchange.bind(this);
       
          
    }

   

    handleSubmit(event) {
        event.preventDefault();
        const addPromo = {
            date: this.state.date.valueString,
            file: this.state.file.content,
        };
        createPromo(addPromo)
        .then(response => {
            notification.success({
                message: 'Polling App',
                description: "Promotion successfully has been added !",
            });          
            this.props.history.push("/CreatePromo");
            this.setState({
                   
                    'file': {
                        'value': ''
                            },
                    'date': {
                        'value': ''
                        },
                });
            
        }).catch(error => {
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
        
    }


    isFormInvalid() {
        return !(
            this.state.file.validateStatus === true 
           && this.state.date.validateStatus === true
           
        );
    }
   onChangeDate(date, dateString) {
    if(dateString.trim()=="")
    {
            this.setState({
                'date' : {
                'value' : null,
                'valueString':null,
                'validateStatus': false,
                'errorMsg': 'Empty value',
                },
            });
    }
    else{
        this.setState({
            'date' : {
            'value' : date,
            'valueString':dateString,
            'validateStatus': true,
            'errorMsg': null,
            },
        });
    }
     
   }
   FileUploadchange(event){
      if(!event.target.value)
      {
        this.setState({
            'file' : {
                'value' : null,
                'content':null,
                'validateStatus': false,
                'errorMsg': "failed to upload",
               
            }
        });
    }
      else{
        this.setState({
            'file' : {
                'value' : event.target.value,
                'validateStatus': true,
                'content':event.target.files[0],
                'errorMsg': "successfully uploaded",
               
            }
      });
        
        }

        
   }
   
    render() {
  
        return (
            <div className="addEvent-container">
                <h1 className="page-title">Nouvelle promotion :</h1>
                <div className="addEvent-content">
                    <Form onSubmit={this.handleSubmit} className="addEvent-form">
                       
                        <FormItem 
                            label="Date de Clôture :"
                            validateStatus={this.state.date.validateStatus}
                            help={this.state.date.errorMsg}>
                          
                               <DatePicker 
                                size="large"
                                name="date"                
                                value={this.state.date.value}
                              
                                onChange={this.onChangeDate} />
                               
                        </FormItem>
                        <FormItem 
                            label="Image :"
                            validateStatus={this.state.file.validateStatus}
                            help={this.state.file.errorMsg}>
                           
                            <input 
                                    type="file"
                                    className=".addEvent-form-Input"
                                    accept="image/png, image/jpeg, image/jpg"
                                    value={this.state.file.value} 
                                    onChange={this.FileUploadchange} /> 
                        </FormItem>
                      
                        
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="addEvent-form-button"
                                disabled={this.isFormInvalid()}>Confirmation</Button>
                            
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

  
   }

export default addPromo;