import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LogIn from './LogIn';
import DashBoard from './DashBoard';
import BottomNavBar from './BottomNavBar';

class App extends React.Component {
    state = {
        loggedIn: false,
        userInfo: {}
    }

    onSuccessLogIn = values => {
        this.setState({
            loggedIn: true,
            userInfo: values
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/" exact>
                        {this.state.loggedIn ?
                            <DashBoard userInfo={this.state.userInfo}/> :
                            <LogIn onSuccessLogIn={this.onSuccessLogIn} />}
                    </Route>
                    <BottomNavBar />
                </div>
            </Router>
        );
    }
}

export default App;
