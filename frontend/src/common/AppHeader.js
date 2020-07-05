import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render(){
        let _appBar = null;
        if (this.props.isAuthenticated) {
            _appBar = 
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        {/* <Link to="/">MyApp</Link> */}
                        <Typography variant="h6" >
                            <Link color="initial" to="/">MyApp</Link>
                        </Typography>
                        <IconButton edge="start" color="inherit" aria-label="account">
                            <AccountBoxIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>;
        } else {
            _appBar = 
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        {/* <Link to="/">MyApp</Link> */}
                        <Typography variant="h6" >MyApp</Typography>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign up</Link>
                    </Toolbar>
                </AppBar>
            ;
        }


        return(
            


            <div>

                {_appBar}
            </div>
            

        );
    }
}

export default withRouter(AppHeader);