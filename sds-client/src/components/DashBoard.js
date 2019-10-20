import React, {Component} from 'react';
import history from '../history';
import UserPanel from "./UserPanel";
import SearchPanel from "./SearchPanel";
import OrderList from "./OrderList";
import {
    DEMO_GET_OK_ENDPOINT,
    ShipStatus,
    ShipMethod,
    MapApiKey,
    MapThumbnail_prefix,
    MapThumbnail_suffix
} from '../Constants';
import SearchFilter from "./SearchFilter";
import OrderDrawer from "./OrderDrawer";
import {Button} from "antd";

import {ajax, convertAddressToUrl} from "../util";

const dataSent = {status:"OK",userId:"userad@liamg.com",orders:[
    {OrderId:'abcdefg1234',
        OrderNote: 'gift for dad',
        Status: ShipStatus.InProgress,
        CurrentLoc: '37.720015,-122.458905',
        FromAddress: '1398 Valencia St San Francisco, California(CA), 94110',
        ToAddress: '33 Shields St San Francisco, California(CA), 94132',
        ShipMethod: ShipMethod.Mobile,
        PackageInfo: '3x5x4, 2lbs',
    },
    {OrderId:'bcdefgh2345',
        OrderNote: 'gift for mom',
        Status: ShipStatus.Finished,
        CurrentLoc: '37.715342,-122.463503',
        FromAddress: '524 Gates St San Francisco, California(CA), 94110',
        ToAddress: '254 Bright St San Francisco, California(CA), 94132',
        ShipMethod: ShipMethod.Drone,
        PackageInfo: '4x3x5, 3lbs',
    },
    {OrderId:'cdefghi3456',
        OrderNote: 'gift for child',
        Status: ShipStatus.Finished,
        CurrentLoc: '37.761364,-122.503817',
        FromAddress: '450 Duboce Ave San Francisco, California(CA), 94117',
        ToAddress: '1354 44th Ave San Francisco, California(CA), 94122',
        ShipMethod: ShipMethod.Drone,
        PackageInfo: '4x5x5, 4lbs',
    },
    {OrderId:'defghij4567',
        OrderNote: 'gift for wife',
        Status: ShipStatus.InProgress,
        CurrentLoc: '37.797358,-122.441170',
        FromAddress: '2701 Green St San Francisco, California(CA), 94123',
        ToAddress: '1845 25th St San Francisco, California(CA), 94107',
        ShipMethod: ShipMethod.Mobile,
        PackageInfo: '6x5x5, 5lbs',
    }
]};

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
                    <Button onClick={() => {
                        history.push('/newOrder')
                    }}> Make New Order
                    </Button>
                    {/*The following are only for simulating retrieving fake data from backend */}
                    <br/>
                    <br/>
                    <button onClick={() => {
                        this.componentDidMount();
                    }}>retrieve fake data
                    </button>
                    <br/>
                    <button onClick={() => {
                        this.setState({listData: null});
                    }}>fake reloading
                    </button>
                    <button onClick={() =>
                    {
                        if(this.state.imageSource) {
                            this.setState({imageSource:null})
                        } else {
                            ajax('GET', 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',null,
                            (rt)=>{
                                const base64 = btoa(
                                    new Uint8Array(rt).reduce(
                                        (data, byte) => data + String.fromCharCode(byte),
                                        '',
                                    ),
                                );
                                // const base64 = btoa(rt);
                                this.setState({imageSource:'data:;base64,' + base64})
                            },
                            ()=>{
                                console.log("I don't what is the error");
                            }, true)
                        }
                    }}> on/off image: ajax call</button>
                    <img src={this.state.imageSource} />
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