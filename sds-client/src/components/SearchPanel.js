import React, {Component} from 'react';
import {Icon, Input, AutoComplete} from 'antd';
import {ShipMethod} from "../Constants";
import mobile from "../images/auto_mobile.png";
import drone from "../images/drone.png";

const {Option, OptGroup} = AutoComplete;

class SearchPanel extends Component {

    onSearch = searchText => {
        console.log("onSearch: ", searchText);
        // this.setState({
        //     dataSource: !searchText
        //         ? []
        //         : NBA.searchPlayers(searchText).map(
        //             (player) => ({
        //                 fullName: player.fullName,
        //                 playerId: player.playerId,
        //             })
        //         )
        // });
    };

    onSelect = (orderId) => {
        console.log("onSelect", orderId);
        //this.props.openDrawer(orderId);
    };


    options = this.props.listData.map(item => (
        <Option key={item.OrderId} value={item.OrderId} className="search-item-option">
            {item.ShipMethod === ShipMethod.Mobile ?
                <img alt='AutoMobile' src={mobile} className='simple-item-img'/> :
                <img alt='Drone' src={drone} className='simple-item-img'/>}
            <span className="item-option-label">
                {item.OrderNote}
            </span>
        </Option>

    )).concat([
        <Option disabled key="all" className="show-all">
            <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
                View all results
            </a>
        </Option>,
    ]);

    render() {
        return (
            //
            <AutoComplete
                className="item-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{width: 300}}
                size="large"
                style={{width: '100%'}}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                dataSource={this.options}
                placeholder="search notes here"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon"/>}/>
            </AutoComplete>
        );
    }
}

export default SearchPanel;