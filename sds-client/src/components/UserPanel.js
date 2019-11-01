import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Button } from 'antd';
import history from '../history';


class UserPanel extends Component {
    // state = {
    //     loggedIn: this.props.loggedIn, //true
    // };

    onClickLogout = () => {
        this.props.onLogout();
        //TODO: tell server this user is logged out
        //TODO: destroy current session
        // this.setState({loggedIn: false});
        // history.push('/');
    };


    render() {
        console.log("D:in UserPanel:");
        console.log(this.props);
        return (
            <div id="user-panel">
                <h3>Welcome: </h3>
                <div id='user-id-UserPanel'> {this.props.userInfo.info.email?this.props.userInfo.info.email:'NoUserLongUserIDHHHHHH@abcdefg.com'} </div>
                <a onClick={this.onClickLogout}> logout </a>
                {/*<div onClick={this.onClickLogout}> logout </div>*/}
                {/*<Link to="/login" onClick={this.onClickLogout}> logout </Link>*/}
                {/*<Button onClick={this.onClickLogout} className="logout-button">Logout</Button>*/}
                {/*{this.props.loggedIn ? null : <Redirect to="/login"/>}*/}
            </div>
        );
    }
}

export default UserPanel;