import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.currentUser);
        console.log(this.props.isAuthenticated);
    }
    render(){

        return(
            <div>

                <p>login main</p>
            </div>

        );
    }
}

export default Test;