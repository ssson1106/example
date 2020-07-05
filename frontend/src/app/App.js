import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Signup from '../user/signup/Signup';
import Login from '../user/login/Login';
import NotFound from '../common/NotFound';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import Test from '../test/Test';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
    }

    loadCurrentUser(){
        this.setState({
            isLoading: true
        });
        getCurrentUser()
        .then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
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

    handleLogout(redirectTo="/",  
            description="You're successfully logged out."){
        localStorage.removeItem(ACCESS_TOKEN);
        
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);
        
        alert(description);
    }

    handleLogin(){
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                <AlertTitle>Success</AlertTitle>
                You're successfully logged in.
            </Alert>
        </Snackbar> */}
        alert("You're successfully logged in.");

        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" className="app-container">
                    <AppHeader isAuthenticated={this.state.isAuthenticated} 
                        currentUser={this.state.currentUser} 
                        onLogout={this.handleLogout} />
                    <Typography component="div" style={{ height: '100vh' }} className="app-content">
                        <Switch>
                            <Route exact path="/" 
                            render={(props) => <Test isAuthenticated={this.state.isAuthenticated} 
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                            </Route>
                            <Route path= "/signup" component={Signup}></Route>
                            <Route path="/login" 
                                render={(props) => <Login onLogin={this.handleLogin} {...props}/>}></Route>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Typography>
                </Container>
            </React.Fragment>
        );
    }

    
}

export default withRouter(App);