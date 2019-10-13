import React, {Component} from 'react';
import history from '../history';

/* TODO 1: add <UserPanel /> in control-panel */
/* TODO 3: add <SearchPanel /> in control-panel */
/* TODO 4: add <OrderList /> under control-panel */
class DashBoard extends Component {
    state = {
        userInfo: this.props.userInfo
    }

    render() {
        return (
            <div id="dashboard">
                <section id="control-panel">
                    <p>
                        this is user panel
                        <button onClick={() => {history.push('/login')}}> Logout </button>
                    </p>

                    <button onClick={() => {history.push('/newOrder')}}> Make New Order </button>
                    <p>this is search panel</p>
                </section>
                <p>this is order list</p>
            </div>
        );
    }
}

export default DashBoard;