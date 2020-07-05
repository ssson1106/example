import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './Signup.css';
//import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants'; 

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Container from '@material-ui/core/Container';

class Signup extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name:{value:''},
            username:{value:''},
            email:{value:''},
            password:{value:''}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
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
    
        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        signup(signupRequest)
        .then(response => {
            alert("Thank you! You're successfully registered. Please Login to continue!");         
            this.props.history.push("/login");
        }).catch(error => {
            alert(error.message || 'Sorry! Something went wrong. Please try again!');
        });
    }
    isFormInvalid() {
        return !(this.state.name.validatestatus === 'success' &&
            this.state.username.validatestatus === 'success' &&
            this.state.email.validatestatus === 'success' &&
            this.state.password.validatestatus === 'success'
        );
    }

    render(){
        
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={{alignItems:'centor',display: 'flex', flexDirection: 'column', height: '100vh'}}>
                    <Avatar style={{ marginBottom: 10 }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    validatestatus={this.state.name.validatestatus}
                                    label="Full Name"
                                    helperText={this.state.name.errorMsg}
                                    error={this.state.name.errorMsg != null ? true:false}
                                    required
                                    autoFocus
                                    fullWidth
                                    variant="outlined"
                                    name="name"
                                    autoComplete="given-name"
                                    placeholder="Your full name"
                                    value={this.state.name.value} 
                                    onChange={event => this.handleInputChange(event, this.validateName)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    validatestatus={this.state.username.validatestatus}
                                    label="Username"
                                    error={this.state.username.errorMsg != null ? true:false}
                                    helperText={this.state.username.errorMsg}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="username"
                                    autoComplete="off"
                                    placeholder="A unique username"
                                    value={this.state.username.value} 
                                    onBlur={this.validateUsernameAvailability}
                                    onChange={event => this.handleInputChange(event, this.validateUsername)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    validatestatus={this.state.email.validatestatus}
                                    label="Email"
                                    error={this.state.email.errorMsg != null ? true:false}
                                    helperText={this.state.email.errorMsg}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Your email"
                                    value={this.state.email.value} 
                                    onBlur={this.validateEmailAvailability}
                                    onChange={event => this.handleInputChange(event, this.validateEmail)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    validatestatus={this.state.password.validatestatus}
                                    label="Password"
                                    error={this.state.password.errorMsg != null ? true:false}
                                    helperText={this.state.password.errorMsg}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="A password between 6 to 20 characters"
                                    value={this.state.password.value} 
                                    onChange={event => this.handleInputChange(event, this.validatePassword)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            style={{ marginTop: 10 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={this.isFormInvalid()}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                    
                    </form>

                </div>            
            </Container>

            
                  
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validatestatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validatestatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validatestatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validatestatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validatestatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validatestatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validatestatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validatestatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validatestatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validatestatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validatestatus === 'error') {
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
                validatestatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validatestatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validatestatus: 'error',
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validatestatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validatestatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validatestatus === 'error') {
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
                validatestatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validatestatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validatestatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validatestatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validatestatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validatestatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validatestatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validatestatus: 'success',
                errorMsg: null,
            };            
        }
    }


}

export default Signup;