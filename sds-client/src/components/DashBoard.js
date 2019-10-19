import React, {Component} from 'react';
import history from '../history';
import UserPanel from "./UserPanel";
import SearchPanel from "./SearchPanel";
import OrderList from "./OrderList";
import {FakeData} from '../Constants';
import SearchFilter from "./SearchFilter";


class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
            listData: null,
            drawerVisible: false,
            isListDataValid: false,
        };
        this.itemInDrawer = null;
        // this.filteredData = FakeData;
    }


    //TODO: do ajax call to fetch Order data from server
    //TODO: only fetch data when refresh this page or redirect to this page? (this.props.history)

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

    //TODO: need to implement the sort by ordered date
    //TODO: need to discuss with backend to design the format of data in date field of each order
    orderDateIncrease = () => {
        console.log('You clicked order date increase!!');
    };
    orderDateDecrease = () => {
        console.log('You clicked order date decrease!!');
    };
    statusIncrease = () => {
        this.setState(
            (prevSt) => {
                if (prevSt.listData) {
                    return {
                        listData: prevSt.listData.sort((a, b) => {return a.Status - b.Status})};
                }
            }
        );
    };
    statusDecrease = () => {
        this.setState(
            (prevSt) => {
                if (prevSt.listData) {
                    return {
                        listData: prevSt.listData.sort((a, b) => {return b.Status - a.Status})}
                }
            }
        );
    };

    filterFunc = {
        orderDateIncrease: this.orderDateIncrease,
        orderDateDecrease: this.orderDateDecrease,
        statusIncrease: this.statusIncrease,
        statusDecrease: this.statusDecrease
    };

    render() {
        return (
            <div id="dashboard">
                <section id="control-panel">
                    <UserPanel userId={this.state.userInfo.username}/>
                    <button onClick={() => {
                        history.push('/newOrder')
                    }}> Make New Order
                    </button>
                    {/*The following are only for simulating retrieving fake data from backend */}
                    <br/>
                    <br/>
                    <button onClick={() => {
                        this.setState({listData: FakeData});
                    }}>retrieve fake data
                    </button>
                    <br/>
                    <button onClick={() => {
                        this.setState({listData: null});
                    }}>fake reloading
                    </button>
                    {/*The above are only for simulating retrieving fake data from backend */}
                </section>
                <section id="search-order">
                    <div className='search-bar-row'>
                        <SearchPanel listData={this.state.listData}
                                     updateDrawer={this.updateDrawer}
                                     className='search-bar'/>
                        <SearchFilter className='dropdown-filter'
                                      filterFunc={this.filterFunc}
                                      menuDisabled={!this.state.listData}/>
                    </div>
                    <OrderList listData={this.state.listData}
                               updateDrawer={this.updateDrawer}
                               drawerVisible={this.state.drawerVisible}
                               itemInDrawer={this.itemInDrawer}
                    />
                </section>
            </div>
        );
    }
}

export default DashBoard;