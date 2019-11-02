import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import history from '../history';
import BottomNavBar from './BottomNavBar';
import LogIn from './LogIn';
import Register from './Register';
import DashBoard from './DashBoard';
import NewOrder from './NewOrder';
import { withCookies } from 'react-cookie';


class App extends React.Component {
    state = {
        loggedIn: false,
        userInfo: {}
    };

    updateLogInStatus = (loggedIn, values) => {
        const {cookies} = this.props;
        if(loggedIn) {
            cookies.set('email', values.email, { path: '/' });
            cookies.set('sessionID', values.sessionID, { path: '/' });
        } else {
            cookies.remove('email', { path: '/' });
            cookies.remove('sessionID', { path: '/' });
        }
        this.setState({
            loggedIn: loggedIn,
            userInfo: values
        });
        history.push('/');
    };

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <Route path="/" exact>
                    {this.state.loggedIn ?
                        <Redirect to="/dashboard"/> :
                        <Redirect to="/login"/>}
                </Route>
                <Route path="/login" exact>
                    <LogIn onSuccessLogIn={this.updateLogInStatus}/>
                </Route>
                <Route path="/register" exact>
                    <Register onSuccessRegister={this.updateLogInStatus}/>
                </Route>

                <Route path="/dashboard" exact
                       render={(props) =>
                           <DashBoard userInfo={this.state.userInfo} updateLogInStatus={this.updateLogInStatus} match={props.match}/>}
                />

                <Route path="/newOrder">
                    <NewOrder
                        userInfo={this.state.userInfo}
                        pathname="/newOrder"
                    />
                </Route>
                <BottomNavBar/>
            </div>
        );
    }
}

export default withCookies(App);