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
        const {cookie} = this.props;
        console.log('Here is cookie:');
        console.log(cookie);
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
                           <DashBoard userInfo={{info:this.state.userInfo, loggedIn:this.state.loggedIn}} match={props.match}/>}
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