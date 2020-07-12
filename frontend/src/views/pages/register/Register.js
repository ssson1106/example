import React, { useState } from 'react'
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../../util/APIUtils';
import { 
  NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
  USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../../constants';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = (props) => {

  const [inputs, setInputs] = useState({
    name:{value:'', validatestatus:'', errorMsg:null},
    username:{value:'', validatestatus:'', errorMsg:null},
    email:{value:'', validatestatus:'', errorMsg:null},
    password:{value:'', validatestatus:'', errorMsg:null}
  });

  const { name, username, email, password} = inputs;

  const handleInputChange = (e, validationFun) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]:{
        value:value,
        ...validationFun(value) 
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const signupRequest = {
      name: name.value,
      email: email.value,
      username: username.value,
      password: password.value
    };
    signup(signupRequest)
        .then(response => {
            alert("Thank you! You're successfully registered. Please Login to continue!");         
            props.history.push("/login");
        }).catch(error => {
            alert(error.message || 'Sorry! Something went wrong. Please try again!');
        });
  }

  const isFormInvalid = () => {
    return !(name.validatestatus === 'success' &&
        username.validatestatus === 'success' &&
        email.validatestatus === 'success' &&
        password.validatestatus === 'success'
    );
  }

  
const validateName = (name) => {
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

const validateEmail = (email) => {
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

const validateUsername = (username) => {
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

const  validateUsernameAvailability = () => {
  // First check for client side errors in username
  const usernameValue = username.value;
  const usernameValidation = validateUsername(usernameValue);

  if(usernameValidation.validatestatus === 'error') {
    setInputs({
      ...inputs,
      [username]:{
        value:usernameValue,
        ...usernameValidation
      }
    });  
    return;
  }
  
  setInputs({
    ...inputs,
    [username]:{
      value:usernameValue,
      validatestatus: 'validating',
      errorMsg: null
    }
  });  

  checkUsernameAvailability(usernameValue)
  .then(response => {
      if(response.available) {
        setInputs({
          ...inputs,
          [username]:{
            value:usernameValue,
            validatestatus: 'success',
            errorMsg: null
          }
        });  
      } else {
        setInputs({
          ...inputs,
          [username]:{
            value:usernameValue,
            validatestatus: 'error',
            errorMsg: 'This username is already taken'
          }
        });
      }
  }).catch(error => {
      // Marking validatestatus as success, Form will be recchecked at server
      setInputs({
        ...inputs,
        [username]:{
          value:usernameValue,
          validatestatus: 'success',
          errorMsg: null
        }
      });
  });
}

const validateEmailAvailability = () => {
  // First check for client side errors in email
  const emailValue = email.value;
  const emailValidation = validateEmail(emailValue);

  if(emailValidation.validatestatus === 'error') {
    setInputs({
      ...inputs,
      [email]:{
        value: emailValue,
        ...emailValidation
      }
    });    
    return;
  }

  setInputs({
    ...inputs,
    [email]:{
      value: emailValue,
      validatestatus: 'validating',
      errorMsg: null
    }
  });

  checkEmailAvailability(emailValue)
  .then(response => {
      if(response.available) {
        setInputs({
          ...inputs,
          [email]:{
            value: emailValue,
            validatestatus: 'success',
            errorMsg: null
          }
        });
      } else {
        setInputs({
          ...inputs,
          [email]:{
            value: emailValue,
            validatestatus: 'error',
            errorMsg: 'This Email is already registered'
          }
        });
      }
  }).catch(error => {
      // Marking validatestatus as success, Form will be recchecked at server
      setInputs({
        ...inputs,
        [email]:{
          value: emailValue,
          validatestatus: 'success',
          errorMsg: null
        }
      });
  });
}

const validatePassword = (password) => {
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

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <TextField
                                    validatestatus={name.validatestatus}
                                    label="Full Name"
                                    helperText={name.errorMsg}
                                    error={name.errorMsg != null ? true:false}
                                    required
                                    autoFocus
                                    fullWidth
                                    variant="outlined"
                                    name="name"
                                    autoComplete="given-name"
                                    placeholder="Your full name"
                                    value={name.value} 
                                    onChange={event => handleInputChange(event, validateName)}
                                />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <TextField
                                    validatestatus={username.validatestatus}
                                    label="Username"
                                    error={username.errorMsg != null ? true:false}
                                    helperText={username.errorMsg}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="username"
                                    autoComplete="off"
                                    placeholder="A unique username"
                                    value={username.value} 
                                    onBlur={validateUsernameAvailability}
                                    onChange={event => handleInputChange(event, validateUsername)}
                                />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  <TextField
                                    validatestatus={email.validatestatus}
                                    label="Email"
                                    error={email.errorMsg != null ? true:false}
                                    helperText={email.errorMsg}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Your email"
                                    value={email.value} 
                                    onBlur={validateEmailAvailability}
                                    onChange={event => handleInputChange(event, validateEmail)}
                                />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <TextField
                                    validatestatus={password.validatestatus}
                                    label="Password"
                                    error={password.errorMsg != null ? true:false}
                                    helperText={password.errorMsg}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="A password between 6 to 20 characters"
                                    value={password.value} 
                                    onChange={event => handleInputChange(event, validatePassword)}
                                />
                  </CInputGroup>
                  
                  <Button
                            style={{ marginTop: 10 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isFormInvalid()}
                        >
                            Sign Up
                        </Button>
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );  
}




export default Register
