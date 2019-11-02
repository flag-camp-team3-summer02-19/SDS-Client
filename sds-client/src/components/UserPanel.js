import React, {Component} from 'react';
import {ajax} from "../util";
import {LOGOUT_ENDPOINT} from "../Constants";
// import {Link, Redirect} from 'react-router-dom';
// import {Button } from 'antd';
// import history from '../history';

class UserPanel extends Component {

    onClickLogout = () => {
        //TODO: tell server this user is logged out
        ajax('GET',LOGOUT_ENDPOINT,null,
            (rt)=>{
            let result = JSON.parse(rt);
            console.log('userLogout: ' + result.message);
            }, null, false, this.props.ajaxHeader);
        this.props.onLogout();
    };


    render() {
        return (
            <div id="user-panel">
                <h3>Welcome: </h3>
                <div id='user-id-UserPanel'> {this.props.userInfo.info.email?this.props.userInfo.info.email:'NoUserLongUserIDHHHHHH@abcdefg.com'} </div>
                <a onClick={this.onClickLogout}> logout </a>
                {/*<Link to="/login" onClick={this.onClickLogout}> logout </Link>*/}
                {/*<Button onClick={this.onClickLogout} className="logout-button">Logout</Button>*/}
                {/*{this.props.loggedIn ? null : <Redirect to="/login"/>}*/}
            </div>
        );
    }
}

export default UserPanel;