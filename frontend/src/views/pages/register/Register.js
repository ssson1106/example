import React, { useState, useEffect } from 'react';
import { validateEmail, validateName, validateUsername, validatePassword } from './Validation';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../../util/APIUtils';

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
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const Register = (props) => {
    const [inputs, setInputs] = useState({
        name: { value: '', validatestatus: '', errorMsg: null },
        username: { value: '', validatestatus: '', errorMsg: null },
        email: { value: '', validatestatus: '', errorMsg: null },
        password: { value: '', validatestatus: '', errorMsg: null },
    });

    useEffect(()=>{
      //console.log("useEffect", inputs);
    });

    const handleInputChange = (e, validationFun) => {
        setInputs({
            ...inputs,
            [e.target.name]: {
                value: e.target.value,
                ...validationFun(e.target.value),
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const signupRequest = {
            name: inputs.name.value,
            email: inputs.email.value,
            username: inputs.username.value,
            password: inputs.password.value,
        };
        signup(signupRequest)
            .then((response) => {
                alert("Thank you! You're successfully registered. Please Login to continue!");
                props.history.push('/login');
            })
            .catch((error) => {
                alert(error.message || 'Sorry! Something went wrong. Please try again!');
            });
    };

    const isFormInvalid = () => {
        return !(
          inputs.name.validatestatus === 'success' &&
          inputs.username.validatestatus === 'success' &&
          inputs.email.validatestatus === 'success' &&
          inputs.password.validatestatus === 'success'
        );
    };

    const validateUsernameAvailability = async (e) => {
        // First check for client side errors in username
        const usernameValue = e.target.value;
        let usernameValidation = validateUsername(usernameValue);

        if (usernameValidation.validatestatus !== 'error') {
          usernameValidation = await checkUsernameAvailability(usernameValue)
                .then((response) => {
                    if (response.available) {
                        return { validatestatus: 'success', errorMsg: null };
                    } else {
                        return { validatestatus: 'error', errorMsg: 'This username is already taken' };
                    }
                })
                .catch((error) => {
                    // Marking validatestatus as success, Form will be recchecked at server
                    return { validatestatus: 'success', errorMsg: null };
                });
        }

        console.log(usernameValidation);

        setInputs({ ...inputs, username: { value: usernameValue, ...usernameValidation } });
    };

    const validateEmailAvailability = async (e) => {
        // First check for client side errors in email
        const emailValue = e.target.value;
        let emailValidation = validateEmail(emailValue);

        if (emailValidation.validatestatus !== 'error') {
          emailValidation = await checkEmailAvailability(emailValue)
              .then((response) => {
                  if (response.available) {
                      return { validatestatus: 'success', errorMsg: null };
                  } else {
                      return { validatestatus: 'error', errorMsg: 'This Email is already registered' };
                  }
              })
              .catch((error) => {
                  // Marking validatestatus as success, Form will be recchecked at server
                  return { validatestatus: 'success', errorMsg: null };
              });
        }
        console.log(emailValidation);

        setInputs({ ...inputs, email: { value: emailValue, ...emailValidation } });
    };

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
                                            validatestatus={inputs.name.validatestatus}
                                            label="Full Name"
                                            helperText={inputs.name.errorMsg}
                                            error={inputs.name.errorMsg != null ? true : false}
                                            required
                                            autoFocus
                                            fullWidth
                                            variant="outlined"
                                            name="name"
                                            autoComplete="given-name"
                                            placeholder="Your full name"
                                            value={inputs.name.value}
                                            onChange={(event) => handleInputChange(event, validateName)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <TextField
                                            validatestatus={inputs.username.validatestatus}
                                            label="Username"
                                            error={inputs.username.errorMsg != null ? true : false}
                                            helperText={inputs.username.errorMsg}
                                            required
                                            fullWidth
                                            variant="outlined"
                                            name="username"
                                            autoComplete="off"
                                            placeholder="A unique username"
                                            value={inputs.username.value}
                                            onBlur={validateUsernameAvailability}
                                            onChange={(event) => handleInputChange(event, validateUsername)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <TextField
                                            validatestatus={inputs.email.validatestatus}
                                            label="Email"
                                            error={inputs.email.errorMsg != null ? true : false}
                                            helperText={inputs.email.errorMsg}
                                            required
                                            fullWidth
                                            variant="outlined"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Your email"
                                            value={inputs.email.value}
                                            onBlur={validateEmailAvailability}
                                            onChange={(event) => handleInputChange(event, validateEmail)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <TextField
                                            validatestatus={inputs.password.validatestatus}
                                            label="Password"
                                            error={inputs.password.errorMsg != null ? true : false}
                                            helperText={inputs.password.errorMsg}
                                            required
                                            fullWidth
                                            variant="outlined"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="A password between 6 to 20 characters"
                                            value={inputs.password.value}
                                            onChange={(event) => handleInputChange(event, validatePassword)}
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
};

export default Register;
