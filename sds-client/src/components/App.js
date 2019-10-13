import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import LogIn from './LogIn';
import Register from './Register';
import DashBoard from './DashBoard';
import history from '../history';

class App extends React.Component {
    state = {
        loggedIn: false,
        userInfo: {}
    }

    onSuccessLogIn = values => {
        this.setState({
            loggedIn: true,
            userInfo: values
        });
        history.push('/');
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <Route path="/" exact>
                    {this.state.loggedIn ?
                        <Redirect to="/dashboard" /> :
                        <Redirect to="/login" />}
                </Route>
                <Route path="/login" exact>
                    {console.log(1)}
                    <LogIn onSuccessLogIn={this.onSuccessLogIn} />
                </Route>
                <Route path="/register" exact>
                    <Register onSuccessRegister={this.onSuccessLogIn} />
                </Route>
                <Route path="/dashboard" exact>
                    <DashBoard userInfo={this.state.userInfo}/>
                </Route>
                <BottomNavBar />
            </div>
        );
    }
}

export default App;
