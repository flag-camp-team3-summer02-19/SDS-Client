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
            selectedItem: undefined,
            showSelectedItem: false,
        };
        // this.showSelectedItem = false;
    }


    //TODO: do ajax call to fetch Order data from server

    openDrawer = (item) => {
        this.setState((prevState) => {
            return {selectedItem: item,

            };
        });
        this.showSelectedItem = true;
    };

    onItemSelected = () => {
        // if (this.state.showSelectedItem) {
        //     this.setState({showSelectedItem: false});
        // }
        this.showSelectedItem = false;
        console.log('DashBoard: onItemSelected: ');
        console.log(this.refs);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('DashBoard: shouldComponentUpdate');
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('DashBoard: componentDidUpdate');
    }

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
                    <OrderList listData={this.state.listData}
                               selectedItem={this.state.selectedItem}
                               showSelectedItem={this.showSelectedItem}
                               onItemSelected={this.onItemSelected}
                    />
                </section>
            </div>
        );
    }
}

export default DashBoard;