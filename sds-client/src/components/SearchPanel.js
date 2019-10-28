import React, {Component} from 'react';
import {Icon, Input, AutoComplete, Row,Col, Menu} from 'antd';
import {ShipMethod} from "../Constants";
import mobile from "../assets/images/auto_mobile.png";
import drone from "../assets/images/drone.png";

const {Option, OptGroup} = AutoComplete;

class SearchPanel extends Component {

    //data in dropdown will only be updated from this.props when onFocus.
    //It will not be updated from outside (this.props) when onSearch or onSelect.
    //And this is the behavior we expect.
    state = {
        dataSource: this.props.listData,
        searchText: '',
    };

    filterItem = (searchText) => {
        let searchTextUC = searchText.toUpperCase();
        const listData = this.props.listData.map(
            item => {
                return {
                    ...item,
                    OrderId: item.OrderId.toString().toUpperCase(), // change to string format
                    formattedOrderNote: item.OrderNote,
                    formattedOrderId: item.OrderId.toString().toUpperCase(),
                }
            }
        );
        if (!listData) {
            return listData;
        }
        let ret = [];
        if (!searchText) {
            ret = listData;
        } else {
            for (let i=0; i<listData.length; i++) {
                let item = listData[i];
                let idx = item.OrderId.indexOf(searchTextUC.toUpperCase());
                let noteArray = item.OrderNote.split(searchText);
                let newItem = {...item};
                if (idx === 0 || noteArray.length > 1) {
                    newItem.formattedOrderId = idx === 0 ?
                        (<span>
                            <strong>{item.OrderId.substr(0, searchText.length)}</strong>
                            {item.OrderId.substr(searchText.length)}
                        </span>):item.OrderId;

                    newItem.formattedOrderNote = noteArray.length > 0 ?
                        (<span>
                            {noteArray.map(
                                (currentValue, index, arr) => {
                                    return (<span key={index}>{currentValue}{index===arr.length-1?null:<strong>{searchText}</strong>}</span>)
                                })
                            }
                        </span>):item.OrderNote;
                    ret.push(newItem);
                }
            }
        }
        return ret;
    };

    onSearch = searchText => {
        console.log("onSearch: ", searchText);
        this.setState({
            dataSource: this.filterItem(searchText),
            searchText: searchText,
        });
    };

    onSelect = (value, option) => {
        this.props.updateDrawer(option.props.item, true);
        console.log("onSelect: ", value);
    };

    onFocus = () => {
        this.onSearch(this.state.searchText);
        console.log("onFocus ");
    };

    onPressEnter = (a,b,c) => {
        console.log(a);
        console.log(b);
        console.log(c);
    };

    render() {
        const dataSource = this.state.dataSource? this.state.dataSource : [];
        const options = dataSource.map(item => (
            <Option key={item.OrderId} value={item.OrderNote} className="search-item-option" item={item}>
                <Row>
                    <Col span={1}>
                        {item.ShipMethod === ShipMethod.Mobile ?
                            <img alt='AutoMobile' src={mobile} className='simple-item-img-search-bar'/> :
                            <img alt='Drone' src={drone} className='simple-item-img-search-bar'/>}
                    </Col>
                    <Col>
                        <Row className="item-option-label">
                            <Col span={18}>{item.formattedOrderNote}</Col>
                        </Row>
                        <Row className="item-option-trackingNum">
                            <Col span={8} offset={18}>Tracking Number: {item.formattedOrderId}</Col>
                        </Row>
                    </Col>
                </Row>

            </Option>

        ))
        //     .concat([
        //     <Option disabled key="all" className="show-all">
        //         <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
        //             View all results
        //         </a>
        //     </Option>,
        // ]);

        return (
            <AutoComplete
                className="item-search"
                size="large"
                style={{width: '100%'}}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                onFocus={this.onFocus}
                dataSource={options}
                placeholder="search notes here"
                optionLabelProp="value"
                defaultActiveFirstOption = {false}
            >
                <Input suffix={<Icon type="search" className="certain-category-icon"/>} allowClear onPressEnter={this.onPressEnter}/>
            </AutoComplete>
        );
    }
}

export default SearchPanel;