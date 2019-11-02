import React, {Component} from 'react';
import {Select} from "antd";
import {TagColorMap, TagNames} from '../Constants';
const {Option} = Select;

class FilterSelect extends Component {

    onChange = (tagName) => {
        this.props.onChangeFilterTag(tagName);
    };

    render() {
        return (
            <div className='filter-select-tag-name-div'>
                <Select defaultValue={TagNames.all}
                        size='small'
                        style={{ width:'118px',}}
                        onChange={this.onChange}
                        className='filter-select-tag-name'
                >
                    <Option value={TagNames.all}>{TagNames.all}</Option>
                    <Option value={TagNames.addressFrom}>{TagNames.addressFrom}</Option>
                    <Option value={TagNames.addressTo}>{TagNames.addressTo}</Option>
                    <Option value={TagNames.address}>{TagNames.address}</Option>
                    <Option value={TagNames.note}>{TagNames.note}</Option>
                    <Option value={TagNames.trackingNum}>{TagNames.trackingNum}</Option>
                </Select>
            </div>
        );
    }
}

export default FilterSelect;