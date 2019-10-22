import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button } from 'antd';
import history from '../history';


class UserPanel extends Component {
    state = {
        loggedIn: true
    };

    onClickLogout = () => {
        //TODO: tell server this user is logged out
        //TODO: destroy current session
        this.setState({loggedIn: false});
        // history.push('/');
    };


    render() {
        return (
            <div id="user-panel">
                <h3>Welcome: </h3>
                <div id='user-id-UserPanel'> {this.props.userId?this.props.userId:'NoUserLongUserIDHHHHHH@abcdefg.com'} </div>
                <Link to="/login"> logout </Link>
                {/*<Button onClick={this.onClickLogout} className="logout-button">Logout</Button>*/}
                {/*{this.state.loggedIn ? null : <Redirect to="/login"/>}*/}
            </div>
        );
    }
}

export default UserPanel;