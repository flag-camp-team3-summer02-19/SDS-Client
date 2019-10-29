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


class App extends React.Component {
    state = {
        loggedIn: false,
        userInfo: {}
    };

    onSuccessLogIn = (loggedIn, values) => {
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
                    <LogIn onSuccessLogIn={this.onSuccessLogIn}/>
                </Route>
                <Route path="/register" exact>
                    <Register onSuccessRegister={this.onSuccessLogIn}/>
                </Route>

                <Route path="/dashboard" exact
                       render={(props) =>
                           <DashBoard userInfo={this.state.userInfo} match={props.match}/>}
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

export default App;