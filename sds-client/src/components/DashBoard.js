import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import history from '../history';
import UserPanel from "./UserPanel";
import SearchPanel from "./SearchPanel";
import OrderList from "./OrderList";
import {
    DEMO_GET_OK_ENDPOINT,
    MapApiKey,
    MapThumbnail_prefix,
    MapThumbnail_suffix,
    TagColorMap,
    TagNames,
    ORDERS_ENDPOINT
} from '../Constants';
import SearchFilter from "./SearchFilter";
import OrderDrawer from "./OrderDrawer";
import {Button, BackTop, Tag} from "antd";
import FilterTags from "./FilterTags";

import {ajax, convertAddressToUrl} from "../util";
import FilterSelect from "./FilterSelect";
import { withCookies } from 'react-cookie';

class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo.email,
            listData: null,
            drawerVisible: false,
            isListDataValid: false,
            filterTags:[],
            currentFilterTagName:TagNames.all,
            reload: false,
        };
        this._isMounted = false;
        this.itemInDrawer = null;
        this.listData_cache = this.state.listData;
        this.tagFilterMap = new Map(); //key:string of "tagType:searchText", value:{tag, filter}
        this.ajaxHeader = [];
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //TODO: only fetch data when refresh this page or redirect to this page? (this.props.history)
    componentDidMount() {
        this._isMounted = true; // this is a fix to avoid warning: Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        this.loadingDataFromServer();
    }

    loadingDataFromServer = () => {
        this.setState({reload:false, listData:null});
        const {cookies} = this.props;
        if(cookies.get('sessionID')){
            this.ajaxHeader = [['sessionID', cookies.get('sessionID')]];
            this.setState({userInfo:cookies.get('email')});
            //do ajax call to fetch simple Order data from server
            ajax('GET',ORDERS_ENDPOINT,null, this.onDataUpdated, this.onDataUpdateFailed,false, this.ajaxHeader,false);
        } else {
            this.onLogout();
        }
    };

    onLogout = () => {
        this.props.updateLogInStatus(false,undefined);
    };

    ajax_recursive_wrapper = (arr, currIdx) => {
        if(currIdx < arr.length) {
            const thumbnailUrl = MapApiKey === 'Google Map API' ?
                'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' :
                MapThumbnail_prefix + arr[currIdx].CurrentLoc + MapThumbnail_suffix + MapApiKey;
            ajax('GET', thumbnailUrl, null,
                (rt) => {
                    const base64 = btoa(new Uint8Array(rt).reduce((data, byte) => data + String.fromCharCode(byte),'',),);
                    arr[currIdx].thumbImgSource = 'data:;base64,' + base64;
                    this.ajax_recursive_wrapper(arr, currIdx + 1);
                },() => {console.log("ajax_recursive_wrapper failed on item: " + currIdx);}, true);
        } else {
            //only re-render map thumbnail after all images are downloaded.
            if(this._isMounted) {
                this.setState({listData: arr});
            }
        }
    };
    onDataUpdated = (resp) => {
        if(this._isMounted){
            let result = JSON.parse(resp);
            let orders = [];
            if (result.status === "OK") {
                orders = result.ordersSummary.map(
                    (cv) => {
                        return {
                            OrderId: cv.orderId,
                            OrderNote: cv.notes,
                            FromAddress: cv.from,
                            ToAddress: cv.to,
                            ShipMethod: cv.deliveryType,
                            Status: cv.deliveryStatus,
                            OrderedTime: cv.orderedTime,
                            CurrentLoc: cv.currentLocLatLon.lat.toFixed(6) +','+ cv.currentLocLatLon.lon.toFixed(6),
                        }
                    }
                );
                this.setState({listData: orders});

                //the following is temp code to add thumbnailSource in each item.
                // let result_clone = Object.assign([],result);
                this.listData_cache = orders;

                //This is to fetch map thumbnail from server and do re-render after all images are downloaded.
                this.ajax_recursive_wrapper(orders, 0);
            } else {
                this.onLogout();
            }

        }
    };

    onDataUpdateFailed = () => {
        console.log("ajax failed on fetching order data");
        if (this._isMounted) {
            this.setState({listData: [], reload: true});
        }
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

    orderDateIncrease = () => {
        this.setState(
            (prevSt) => {
                if (prevSt.listData) {
                    let newListData = [...prevSt.listData];
                    return {
                        listData: newListData.sort((a, b) => {return a.OrderedTime - b.OrderedTime})};
                }
            }
        );
    };
    orderDateDecrease = () => {
        this.setState(
            (prevSt) => {
                if (prevSt.listData) {
                    let newListData = [...prevSt.listData];
                    return {
                        listData: newListData.sort((a, b) => {return b.OrderedTime - a.OrderedTime})};
                }
            }
        );
    };
    statusIncrease = () => {
        this.setState(
            (prevSt) => {
                if (prevSt.listData) {
                    let newListData = [...prevSt.listData];
                    return {
                        listData: newListData.sort((a, b) => {return a.Status - b.Status})};
                }
            }
        );
    };
    statusDecrease = () => {
        this.setState(
            (prevSt) => {
                if (prevSt.listData) {
                    let newListData = [...prevSt.listData];
                    return {
                        listData: newListData.sort((a, b) => {return b.Status - a.Status})}
                }
            }
        );
    };

    sortFunc = {
        orderDateIncrease: this.orderDateIncrease,
        orderDateDecrease: this.orderDateDecrease,
        statusIncrease: this.statusIncrease,
        statusDecrease: this.statusDecrease
    };

    filter_note = (searchText, item) => item.OrderNote.toLowerCase().includes(searchText.toLowerCase());
    filter_trackingNum = (searchText, item) => item.OrderId.toString().toUpperCase().startsWith(searchText.toUpperCase());
    filter_addressFrom = (searchText, item) => item.FromAddress.toLowerCase().includes(searchText.toLowerCase());
    filter_addressTo = (searchText, item) => item.ToAddress.toLowerCase().includes(searchText.toLowerCase());

    filterSearchText = (searchText, filterClass, inListData) => {
        let filteredListData;
        if(!searchText) {
            filteredListData = inListData;
        } else if(filterClass === TagNames.all) {
            filteredListData = inListData.filter((currentValue, index, arr) => {
                return this.filter_note(searchText, currentValue)
                    || this.filter_trackingNum(searchText, currentValue)
                    || this.filter_addressFrom(searchText, currentValue)
                    || this.filter_addressTo(searchText, currentValue);
            });
        } else if(filterClass === TagNames.note) {
            filteredListData = inListData.filter((currentValue, index, arr) => {
                return this.filter_note(searchText, currentValue);
            });
        } else if(filterClass === TagNames.trackingNum) {
            filteredListData = inListData.filter((currentValue, index, arr) => {
                return this.filter_trackingNum(searchText, currentValue);
            });
        } else if(filterClass === TagNames.addressFrom) {
            filteredListData = inListData.filter((currentValue, index, arr) => {
                return this.filter_addressFrom(searchText, currentValue);
            });
        } else if(filterClass === TagNames.addressTo) {
            filteredListData = inListData.filter((currentValue, index, arr) => {
                return this.filter_addressTo(searchText, currentValue);
            });
        } else if(filterClass === TagNames.address) {
            filteredListData = inListData.filter((currentValue, index, arr) => {
                return this.filter_addressFrom(searchText, currentValue)
                    || this.filter_addressTo(searchText, currentValue);
            });
        } else {
            filteredListData = undefined;
        }
        return filteredListData;
    };

    onPressEnter = (searchText) => {
        if(!searchText) return;
        let newTagKey = this.state.currentFilterTagName + searchText;
        if (this.tagFilterMap.has(newTagKey)) return;
        this.setState((prevState) => {
            this.tagFilterMap.set(newTagKey, {tagName:this.state.currentFilterTagName, searchText:searchText});
            return {
                listData: this.searchFilterChain(this.listData_cache),
                filterTags: this.genFilterTags(),
            }
        });
    };

    onCloseFilterTag = (tag, idx) => {
        this.setState((prevSt)=> {
            let curTagKey = tag.tagName + tag.searchText;
            this.tagFilterMap.delete(curTagKey);
            return {
                listData: this.searchFilterChain(this.listData_cache),
                filterTags: this.genFilterTags(),
            };
        })
    };

    onCloseAllFilterTags = () => {
        let tags = [];
        this.tagFilterMap.clear();
        this.setState({listData: this.searchFilterChain(this.listData_cache), filterTags: tags});
    };

    searchFilterChain = (initListData) => {
        let filteredListData = initListData;
        for (let [tagKey, tagValue] of this.tagFilterMap.entries()) {
            filteredListData = this.filterSearchText(tagValue.searchText, tagValue.tagName, filteredListData);
        }
        return filteredListData;
    };

    genFilterTags = () => {
        let tags = [];
        for (let [tagKey, tagValue] of this.tagFilterMap.entries()) {
            tags.push({tagName:tagValue.tagName, searchText: tagValue.searchText, color:TagColorMap[tagValue.tagName]});
        }
        return tags;
    };

    onChangeFilterTag = (tagName) => {
        this.setState({currentFilterTagName:tagName})
    };

    render() {
        return (
            <div id="dashboard">
                <section id="control-panel">
                    <UserPanel userInfo={this.state.userInfo}
                               onLogout={this.onLogout}
                               ajaxHeader={this.ajaxHeader}/>
                    <Button onClick={() => {
                        history.push('/newOrder')
                    }}> Make New Order
                    </Button>
                    <br/>
                    <br/>
                    {this.state.reload ?
                        <Button onClick={this.loadingDataFromServer}>Click me to reload</Button> : null}
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
                    <div className='filter-select-tag-date-picker'>
                        <FilterSelect onChangeFilterTag={this.onChangeFilterTag}/>
                    </div>
                    <FilterTags tags={this.state.filterTags}
                                onCloseTag={this.onCloseFilterTag}
                                onCloseAllTags={this.onCloseAllFilterTags}
                    />
                    <BackTop/>
                    <OrderList listData={this.state.listData}
                               updateDrawer={this.updateDrawer}
                               itemInDrawer={this.itemInDrawer}
                    />
                    <OrderDrawer drawerVisible={this.state.drawerVisible}
                                 itemInDrawer={this.itemInDrawer}
                                 updateDrawer={this.updateDrawer}
                                 ajaxHeader={this.ajaxHeader}
                                 onLogout={this.onLogout}/>
                </section>
            </div>
        );
    }
}

export default withCookies(DashBoard);