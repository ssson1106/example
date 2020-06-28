import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Signup from '../user/signup/Signup';
import LoadingIndicator from '../common/LoadingIndicator';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
            isAuthenicated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3
        });
    }

    loadCurrentUser(){
        this.setState({
            isLoading: true
        });
        getCurrentUser()
        .then(response => {
            this.setState({
                currentUser: response,
                isAuthenicated: true,
                isLoading: false
            });
        })
        .catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount(){
        this.loadCurrentUser();
    }

    handleLogout(redirectTo="/", notificationType="success", 
            desciption="You're successfully logged out."){
        localStorage.removeItem(ACCESS_TOKEN);
        
        this.setState({
            currentUser: null,
            isAuthenicated: false
        });

        this.props.history.push(redirectTo);

        notification.success({
            message: 'MyApp',
            desciption: desciption
        });
    }

    handleLogin(){
        notification.success({
            message: 'MyApp',
            desciption: "You're successfully logged in."
        });

        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render(){
        if(this.state.isLoading){
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                
                <Content className="app-content">
                    <Switch>
                        <Route path= "/signup" component={Signup}></Route>
                    </Switch>
                </Content>
            </Layout>
        );
    }

    
}

export default withRouter(App);