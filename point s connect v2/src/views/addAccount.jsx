import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../util/APIUtils';
import '../assets/css/Signup.css';
import { Link } from 'react-router-dom';

import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';

import { Form, Input, Button, notification,Select } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;

class addAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            role:{
                value:'',   
            },
            ville:{
                    value:''
            },
            societe:
                {
                     value:''
                },
            fonction:
                     {
                         value:''
                    },
            roles:[],

            }
        
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.validateFranchise=this.validateFranchise.bind(this);
        this.handleRole=this.handleRole.bind(this);
        this.renderElementSupplementaire=this.renderElementSupplementaire.bind(this);
    }
    /*componentDidMount() {
        fetch(API_BASE_URL + "/roles")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                roles: result
              });
            },

            (error) => {
              this.setState({
                error
              });
            }
          )
      }*/
 renderElementSupplementaire(role)
    {
        if(role==='Franch')
        {
            return(
            <div>
                <FormItem label="Ville"
                            validateStatus={this.state.ville.validateStatus}
                            help={this.state.ville.errorMsg}>
                             
                            <Input 
                                    size="large"
                                    name="ville" 
                                    autoComplete="off"
                                    placeholder="ex: Casablanca"
                                    value= {this.state.ville.value} 
                                    onChange={(event) => this.handleRole(event, this.validateFranchise)} />    
               </FormItem>
                <FormItem 
                label="Fonction"
                validateStatus={this.state.fonction.validateStatus}
                help={this.state.fonction.errorMsg}>
                   
                <Input 
                    size="large"
                    name="fonctionFr" 
                    autoComplete="off"
                    placeholder="ex: responsable marketing"
                    value={this.state.fonction.value} 
                    onChange={(event) => this.handleRole(event, this.validateFranchise)} />    
                </FormItem>
            </div>
            )

        }
        if(role ==='GCompte')
        {
            return(
                <div>
                <FormItem label="Societe"
                            validateStatus={this.state.societe.validateStatus}
                            help={this.state.societe.errorMsg}>
                             
                                <Input 
                                    size="large"
                                    name="societe" 
                                    autoComplete="off"
                                    placeholder="ex: IAM"
                                    value={this.state.societe.value} 
                                    onChange={(event) => this.handleRole(event, this.validateFranchise)} />    
               </FormItem>
                <FormItem label="Fonction"
                            validateStatus={this.state.fonction.validateStatus}
                            help={this.state.fonction.errorMsg}>
                
                <Input 
                    size="large"
                    name="fonctionGc" 
                    autoComplete="off"
                    placeholder="ex: responsable marketing"
                    value={this.state.fonction.value} 
                    onChange={(event) => this.handleRole(event, this.validateFranchise)} />    
                </FormItem>
                </div>
            );
            }

        
    }
    handleRole(event,validationFun){
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        if(inputName==="fonctionGc")
        {
            this.setState({
                    'fonction':{
                        'value': inputValue,
                        ...validationFun(inputValue),
                }
            
            });
        }
        if(inputName==="fonctionFr")
        {
            this.setState({
               
                    'fonction':{
                        'value':inputValue,
                            ...validationFun(inputValue),
                    }
            });
        }
        if(inputName==="ville")
        {
            this.setState({
                
                    'ville':{
                        'value':inputValue,
                        ...validationFun(inputValue)
                
            }
            });
        }
        if(inputName==="societe")
        {
            this.setState({
              
                
                    'societe':{
                        'value': inputValue,
                        ...validationFun(inputValue)

            }
            });
        }
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
    })
}

    handleSubmit(event) {
        event.preventDefault();
    
        const createAccountRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value,
            role : this.state.role.value,
        };
        /*signup(signupRequest)
        .then(response => {
            notification.success({
                message: 'Polling App',
                description: "Thank you! Account has been created successfully !",
            });          
            this.props.history.push("/login");
        }).catch(error => {
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });*/
    }

    isFormInvalid() {
        
        if(this.state.role.value==='PSD')
        {
        return !(this.state.name.validateStatus === true &&
            this.state.username.validateStatus === true &&
            this.state.email.validateStatus === true &&
            this.state.password.validateStatus === true &&
            this.state.role.validateStatus === true 
        );
        }
        if(this.state.role.value==='Franch')
        {
            return !(this.state.name.validateStatus === true &&
            this.state.username.validateStatus === true &&
            this.state.email.validateStatus === true &&
            this.state.password.validateStatus === true &&
            this.state.role.validateStatus === true &&
            this.state.fonction.validateStatus === true &&
            this.state.ville.validateStatus === true
        );
            }
        if(this.state.role.value==='GCompte')
        {
            return !(this.state.name.validateStatus === true &&
            this.state.username.validateStatus === true &&
            this.state.email.validateStatus === true &&
            this.state.password.validateStatus === true &&
            this.state.role.validateStatus === true &&
            this.state.fonction.validateStatus === true &&
            this.state.societe.validateStatus === true
        );
        }
        return true;
        
    }
    onChangeSelect(value) {

        this.setState({
            'role' : {
                'value': value,
                'validateStatus': true,
                'errorMsg': null,
                
            }
        });
      }
      
    
    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Creation d'un compte :</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="Full Name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Full name"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem label="Username"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <Input 
                                size="large"
                                name="username" 
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value} 
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)} />    
                        </FormItem>
                        <FormItem 
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value} 
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
                        <FormItem 
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />  
                        </FormItem>
                          <FormItem 
                            label="Role"
                            validateStatus={this.state.role.validateStatus}
                            help={this.state.role.errorMsg}>
                           <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a role"
                            optionFilterProp="children"
                            onChange={this.onChangeSelect}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                            <Option value="PSD">PSD</Option>
                            <Option value="Franch">Franchisé</Option>
                            <Option value="GCompte">Grande compte</Option>
                        </Select>
                        </FormItem>
                        {this.renderElementSupplementaire(this.state.role.value)}
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Creation de compte</Button>
                          
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions
    validateFranchise=(value)=>{
        if(!value) {
            return {
                validateStatus: false,
                errorMsg: 'Content may not be empty'                
            
            }
        }
        if(value.trim()=="")
        {
            return {
                validateStatus: false,
                errorMsg: 'Content may not be empty' 
            }  

        }
       
        return {
                validateStatus: true,
                errorMsg: null  ,           
            }
    }
 
    
    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: false,
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: false ,
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: true,
                errorMsg: null,
              };            
        }
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: false,
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: false,
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: false,
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: false,
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: false,
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === false) {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: true,
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: false,
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: true,
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === false) {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: true,
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: false,
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: true,
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: false,
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: false,
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: true,
                errorMsg: null,
            };            
        }
    }

}

export default addAccount;