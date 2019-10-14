import React, {Component} from 'react';
import history from '../history';
import UserPanel from "./UserPanel";

/* TODO 3: add <SearchPanel /> in control-panel */
/* TODO 4: add <OrderList /> under control-panel */
class DashBoard extends Component {
    state = {
        userInfo: this.props.userInfo
    };

    render() {
        return (
            <div id="dashboard">
                <section id="control-panel">
                    <UserPanel userId={this.state.userInfo.username}/>
                    <button onClick={() => {history.push('/newOrder')}}> Make New Order </button>
                    <p>this is search panel</p>
                </section>
                <p>this is order list</p>
            </div>
        );
    }
}

export default DashBoard;