import React, {Component} from 'react';
import {Icon, Input, AutoComplete} from 'antd';
import {ShipMethod} from "../Constants";
import mobile from "../images/auto_mobile.png";
import drone from "../images/drone.png";

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
        const {listData} = this.props;
        if (!searchText || !listData) {
            return listData
        }
        let ret = [];
        for (let i=0; i<listData.length; i++) {
            if (listData[i].OrderNote.includes(searchText)) {
                ret.push(listData[i]);
            }
        }
        return ret;
    };

    onSearch = searchText => {
        // console.log("onSearch: ", searchText);
        this.setState({
            dataSource: this.filterItem(searchText),
            searchText: searchText,
        });
    };

    onSelect = (value, option) => {
        this.props.updateDrawer(option.props.item, true);
    };

    onFocus = () => {
        this.onSearch(this.state.searchText);
    };

    render() {
        const dataSource = this.state.dataSource? this.state.dataSource : [];
        const options = dataSource.map(item => (
            <Option key={item.OrderId} value={item.OrderNote} className="search-item-option" item={item}>
                <div className="item-option-label">
                    {item.OrderNote}
                </div>
                {item.ShipMethod === ShipMethod.Mobile ?
                    <img alt='AutoMobile' src={mobile} className='simple-item-img'/> :
                    <img alt='Drone' src={drone} className='simple-item-img'/>}
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
            >
                <Input suffix={<Icon type="search" className="certain-category-icon"/>}/>
            </AutoComplete>
        );
    }
}

export default SearchPanel;