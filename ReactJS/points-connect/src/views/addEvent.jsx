import React, { Component } from 'react';

import '../assets/css/addEvent.css';
//import { Link } from 'react-router-dom';
import { createEvent } from '../util/APIUtils';

import { Form, Input, DatePicker,Button,Upload,Icon,notification } from 'antd';
const FormItem = Form.Item;

class addEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                value: ''
            },
            file: {
                value: ''
            },
            content: {
                value: ''
            },
            date: {
                value: ''
            },
            description: {
             value: ''
         }

        }
      
        const prop = {
            onRemove: file => {
                this.setState({
                    'file' : {
                        'value' : null,
                        'fileList': [],
                        'validateStatus': false,
                        'errorMsg': null,
                       
                    }
                });
            },
            beforeUpload: file => {
                this.setState({
                    'file' : {
                        'value' : file,
                        'fileList': [file],
                        'validateStatus': true,
                        'errorMsg': null,
                       
                    }
                });
            },
            accept :".png,.jpg,.jpeg",
            listType:'picture',
            fileList:this.state.file.fileList,
            onChange:this.FileUploadchange,
            multiple:false,
          };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.FileUploadchange=this.FileUploadchange.bind(this);
       
          
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const addEvent = {
            title: this.state.title.value,
            description: this.state.description.value,
            content: this.state.content.value,
            date: this.state.date.valueString,
            file: this.state.file.content,
        };
        createEvent(addEvent)
        .then(response => {
            notification.success({
                message: 'Polling App',
                description: "Event successfully has been added !",
            });          
            this.props.history.push("/CreateEvent");
            this.setState({
                    'title': {
                        'value': ''
                    },
                    'file': {
                        'value': ''
                    },
                    'content': {
                        'value': ''
                    },
                    'date': {
                        'value': ''
                    },
                    'description': {
                     'value': ''
                 }
        
                });
            
        }).catch(error => {
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
        
    }


    isFormInvalid() {
        return !(this.state.description.validateStatus === true &&
            this.state.file.validateStatus === true && this.state.content.validateStatus === true
            && this.state.title.validateStatus === true && this.state.date.validateStatus === true
           
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
                <h1 className="page-title">Ajout d'un événement ou actualité :</h1>
                <div className="addEvent-content">
                    <Form onSubmit={this.handleSubmit} className="addEvent-form">
                        <FormItem 
                            label="Titre :"
                            validateStatus={this.state.title.validateStatus}
                            help={this.state.title.errorMsg}>
                            <Input 
                                
                                className="addEvent-form-Input"
                                size="large"
                                name="title"
                                autoComplete="off"
                                placeholder="Titre ..."
                                value={this.state.title.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateTitle)} />  
                        </FormItem>
                        <FormItem 
                            label="Description :"
                            validateStatus={this.state.description.validateStatus}
                            help={this.state.description.errorMsg}>
                            <Input 
                                size="large"
                                name="Description"
                                className="addEvent-form-Input"
                                autoComplete="off"
                                placeholder="Description ..."
                                value={this.state.description.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateDescription)} />    
                        </FormItem>
                       
                        
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
                      
                        <FormItem 
                            label="Contenu :"
                            validateStatus={this.state.content.validateStatus}
                            help={this.state.content.errorMsg}
                            >
                            <Input.TextArea
                               
                                rows="10"
                                size="large"
                                name="content"
                                autoComplete="off"
                                placeholder="Le contenu complet ..."
                                value={this.state.content.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateContenu)} />    
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

    // Validation Functions

    validateContenu = (content) => {
        if(!content) {
            return {
                validateStatus: false,
                errorMsg: 'Content may not be empty'                
            
            }
        }
        if(content.trim()=="")
        {
            return {
                validateStatus: false,
                errorMsg: 'Content may not be empty' 
            }  

        }
       
        return {
                validateStatus: true,
                errorMsg: null   ,           
            }
        }
        
    validateTitle(title){
        if(!title) {
            return {
                validateStatus: false,
                errorMsg: 'Title may not be empty'                
            
            }
        }
        if(title.trim()=="")
        {
            return {
                validateStatus: false,
                errorMsg: 'Title may not be empty' 
            }  

        }
     
        return {
                validateStatus: true,
                errorMsg: null   ,           
            }
    }

   
    validateDescription = (description) => {
        if(!description) {
            return {
                validateStatus: false,
                errorMsg: 'Content may not be empty'                
            
            }
        }
        if(description.trim()=="")
        {
            return {
                validateStatus: false,
                errorMsg: 'Content may not be empty' 
            }  

        }
       
        return {
                validateStatus: true,
                errorMsg: null   ,           
            }
    }

   }

export default addEvent;