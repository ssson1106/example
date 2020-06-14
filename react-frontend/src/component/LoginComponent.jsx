import React, {Component} from 'react';
import AuthenticationService from '../service/AuthenticationService'

class LoginComponent extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username: 'user',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }
    
    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    loginClicked(){
        AuthenticationService
            .loginService(this.state.username, this.state.password)
            .then(() => {
                alert('fuckyou');
                AuthenticationService.registerSuccessfulLoginTocken(this.state.username, this.state.password)
            })
            
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent;