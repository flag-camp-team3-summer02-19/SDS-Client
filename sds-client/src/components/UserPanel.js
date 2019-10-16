import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button } from 'antd';
import history from '../history';


class UserPanel extends Component {
    state = {
        loggedIn: true
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('UserPanel: componentDidUpdate');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('UserPanel: shouldComponentUpdate');
        return true;
    }

    onClickLogout = () => {
        //TODO: tell server this user is logged out
        //TODO: destroy current session
        this.setState({loggedIn: false});
        // history.push('/');
    };


    render() {
        return (
            <div id="user-panel">
                <h3>Welcome: {this.props.userId}</h3>
                <Button onClick={this.onClickLogout} className="logout-button">Logout</Button>
                {this.state.loggedIn ? null : <Redirect to="/login"/>}
            </div>
        );
    }
}

export default UserPanel;