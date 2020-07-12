import React, { useReducer } from 'react';
import { login } from '../../../util/APIUtils'
import { ACCESS_TOKEN } from '../../../constants';

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    usernameOrEmail: '',
    password: ''
  });
  const { usernameOrEmail, password } = state;
  const onChange = e => {
    dispatch(e.target);
  };

  
const handleSubmit = (e) => {
  e.preventDefault();
  
  const loginRequest = Object.assign({}, state);

  login(loginRequest)
  .then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      props.onLogin();
  })
  .catch(error => {
      if(error.status === 401) {
          alert('Your Username or Password is incorrect. Please try again!');
      }else { 
          alert('Sorry! Something went wrong. Please try again!');
      }
  });
}

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to username or email.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" 
                        placeholder="Username or Email" 
                        autoComplete="email" 
                        required
                        autoFocus
                        name="usernameOrEmail"
                        value={usernameOrEmail}
                        onChange={onChange}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password"
                        placeholder="Password" 
                        autoComplete="current-password" 
                        required
                        name="password"
                        value={password}
                        onChange={onChange}
                        />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
