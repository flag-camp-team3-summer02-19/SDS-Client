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

    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
            listData: FakeData,
            drawerVisible: false,
        };
        this.itemInDrawer = null;
        // this.showSelectedItem = false;
    }


    //TODO: do ajax call to fetch Order data from server

    // put openDrawer here since <OrderList/> and <SearchPanel/> both want to open and close drawer
    updateDrawer = (item, toOpenDrawer) => {
        if (toOpenDrawer) {
            this.itemInDrawer = item;
            this.setState({drawerVisible: true})
        } else {
            this.itemInDrawer = null;
            this.setState({drawerVisible: false})
        }
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

                    <SearchPanel listData={this.state.listData} updateDrawer={this.updateDrawer}/>

                    <OrderList listData={this.state.listData}
                               updateDrawer={this.updateDrawer}
                               drawerVisible={this.state.drawerVisible}
                               itemInDrawer = {this.itemInDrawer}
                    />
                </section>
            </div>
        );
    }
}

export default DashBoard;