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
import {Button, BackTop, Tag} from "antd";
import FilterTags from "./FilterTags";

import {ajax, convertAddressToUrl} from "../util";

const TagColorMap = {'all:':'volcano', 'address:':'cyan', 'addressFrom:':'blue', 'addressTo:':'geekBlue', 'note:':'green', 'trackingNum:':'purple'};
const TagNames = {all:'all:', address:'address:', addressFrom:'addressFrom:', addressTo:'addressTo', note:'note:', trackingNum:'trackingNum:'};

class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
            listData: null,
            drawerVisible: false,
            isListDataValid: false,
            filterTags:[],
        };
        this.itemInDrawer = null;
        this.listData_cache = this.state.listData;
        this.filtersChain = [];
        this.tagFilterMap = new Map(); //key:string of "tagType:searchText", value:{tag, filter}
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
        // let result_clone = Object.assign([],result);
        //TODO: update these codes after discuss with backend
        this.setState({listData: result.orders});
        this.listData_cache = result.orders;

        //This is to fetch map thumbnail from server and do re-render after all images are downloaded.
        this.ajax_recursive_wrapper(result.orders, 0);
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

    filterSearchText = (searchText, filterClass, inListData) => {
        let filteredListData;
        if(!searchText) {
            filteredListData = inListData;
        } else if(filterClass === TagNames.all) {
            filteredListData = inListData.filter((currentValue, index, arr) => {
                return (currentValue.OrderNote.includes(searchText) || currentValue.OrderId.toString().toUpperCase().startsWith(searchText.toUpperCase()))
            });
        } else {
            filteredListData = undefined;
        }
        return filteredListData;
    };

    onPressEnter = (searchText) => {
        if(!searchText) return;
        let newTagKey = TagNames.all + searchText;
        if (this.tagFilterMap.has(newTagKey)) return;
        this.setState((prevState) => {
            this.tagFilterMap.set(newTagKey, {tagName:TagNames.all, searchText:searchText});
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
                    <FilterTags tags={this.state.filterTags}
                                onCloseTag={this.onCloseFilterTag}
                                onCloseAllTags={this.onCloseAllFilterTags}
                                />
                    <BackTop />
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