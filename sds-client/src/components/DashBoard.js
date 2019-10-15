import React, {Component} from 'react';
import history from '../history';
import UserPanel from "./UserPanel";
import SearchPanel from "./SearchPanel";
import OrderList from "./OrderList";
import {FakeData} from '../Constants'

    ;
/* TODO 3: add <SearchPanel /> in control-panel */

/* TODO 4: add <OrderList /> under control-panel */
class DashBoard extends Component {
    state = {
        userInfo: this.props.userInfo,
        listData: FakeData
    };

    //TODO: do ajax call to fetch Order data from server

    openDrawer = (orderId) => {

    };

    render() {
        return (
            <div id="dashboard">
                <section id="control-panel">
                    <UserPanel userId={this.state.userInfo.username}/>
                    <button onClick={() => {history.push('/newOrder')}}> Make New Order
                    </button>
                </section>
                <section>
                    <SearchPanel listData={this.state.listData} openDrawer={this.openDrawer}/>
                    <OrderList listData={this.state.listData}/>
                </section>
            </div>
        );
    }
}

export default DashBoard;