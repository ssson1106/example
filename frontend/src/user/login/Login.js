import React, { Component } from 'react';
import { login } from '../../util/APIUtils'
import { ACCESS_TOKEN } from '../../constants';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Checkbox } from '@material-ui/core';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            usernameOrEmail:'',
            password:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        
        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
        })
        .catch(error => {
            if(error.status === 401) {
                alert('Your Username or Password is incorrect. Please try again!');
            }else { 
                alert('Sorry! Something went wrong. Please try again!');
            }
        });
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            label="Username OR Email"
                            placeholder="Please input your username or email."
                            autoComplete="email"
                            autoFocus
                            value={this.state.usernameOrEmail.value}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Please input your password."
                            autoComplete="current-password"
                            value={this.state.password.value}
                            onChange={this.handleInputChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 10 }}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>

                    </form>

                </div>
            </Container>
        );
    }
}

export default Login;
