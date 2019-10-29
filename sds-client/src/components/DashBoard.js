import React, {Component} from 'react';
import history from '../history';
import UserPanel from "./UserPanel";
import SearchPanel from "./SearchPanel";
import OrderList from "./OrderList";
import {
    DEMO_GET_OK_ENDPOINT,
    MapApiKey,
    MapThumbnail_prefix,
    MapThumbnail_suffix
} from '../Constants';
import SearchFilter from "./SearchFilter";
import OrderDrawer from "./OrderDrawer";
import {Button} from "antd";

import {ajax, convertAddressToUrl} from "../util";


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
        this.listData_cache = this.state.listData;
    }

    //TODO: only fetch data when refresh this page or redirect to this page? (this.props.history)
    componentDidMount() {
        //do ajax call to fetch simple Order data from server
        ajax('GET',DEMO_GET_OK_ENDPOINT,JSON.stringify(this.state.userInfo), this.onDataUpdated, this.onDataUpdateFailed);
    }

    ajax_recursive_wrapper = (arr, currIdx) => {
        if(currIdx < arr.length) {
            const thumbnailUrl = MapApiKey === 'Google Map API' ?
                'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' :
                MapThumbnail_prefix + convertAddressToUrl(arr[currIdx].CurrentLoc) + MapThumbnail_suffix + MapApiKey;
            ajax('GET', thumbnailUrl, null,
                (rt) => {
                    const base64 = btoa(new Uint8Array(rt).reduce((data, byte) => data + String.fromCharCode(byte),'',),);
                    arr[currIdx].thumbImgSource = 'data:;base64,' + base64;
                    this.ajax_recursive_wrapper(arr, currIdx + 1);
                },() => {console.log("ajax_recursive_wrapper failed on item: " + currIdx);}, true);
        } else {
            //only re-render map thumbnail after all images are downloaded.
            this.setState({listData: arr});
        }
    };
    onDataUpdated = (resp) => {
        let result = JSON.parse(resp);

        //the following is temp code to add thumbnailSource in each item.
        let result_clone = Object.assign([],result);
        //TODO: update these codes after discuss with backend
        this.setState({listData: result.orders});
        this.listData_cache = result.orders;

        //This is to fetch map thumbnail from server and do re-render after all images are downloaded.
        this.ajax_recursive_wrapper(result_clone.orders, 0);

    };

    onDataUpdateFailed = () => {
        console.log("ajax failed on fetching order data");
    };

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

    onPressEnter = (searchText) => {
        let filteredListData;
        if(!searchText) {
            filteredListData = this.listData_cache;
        } else {
            filteredListData = this.listData_cache.filter((currentValue, index, arr) => {
                return (currentValue.OrderNote.includes(searchText) || currentValue.OrderId.toString().toUpperCase().includes(searchText.toUpperCase()))
            });
        }
        //make a copy of the cache
        let listData_clone = Object.assign([],filteredListData);
        this.setState({listData: filteredListData}); //render the list without map thumbnail
        //This is to fetch map thumbnail from server and do re-render after all images are downloaded.
        this.ajax_recursive_wrapper(listData_clone, 0);
    };

    sortFunc = {
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
                    <Button onClick={() => {
                        history.push('/newOrder')
                    }}> Make New Order
                    </Button>
                </section>
                <section id="search-order">
                    <div className='search-bar-row'>
                        <SearchPanel listData={this.state.listData}
                                     updateDrawer={this.updateDrawer}
                                     onPressEnter={this.onPressEnter}
                                     className='search-bar'/>
                        <SearchFilter className='dropdown-filter'
                                      sortFunc={this.sortFunc}
                                      menuDisabled={!this.state.listData}/>
                    </div>
                    <OrderList listData={this.state.listData}
                               updateDrawer={this.updateDrawer}
                               itemInDrawer={this.itemInDrawer}
                    />
                    <OrderDrawer drawerVisible={this.state.drawerVisible}
                                 itemInDrawer={this.itemInDrawer}
                                 updateDrawer={this.updateDrawer}/>
                </section>
            </div>
        );
    }
}

export default DashBoard;