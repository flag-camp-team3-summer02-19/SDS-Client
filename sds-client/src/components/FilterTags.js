import React, {Component} from 'react';
import {Tag, Icon} from "antd";

class FilterTags extends Component {
    render() {
        const {tags} = this.props;
        return (
            <div className="filter-tags">
                {tags.length > 0?<div className='close-all-filters-icon'><Icon width='10px' type="close-circle" onClick={()=> {console.log("clear")}} /></div> : null}
                {tags.map((currentValue, index, arr) => {
                    return (<Tag key={index}
                         closable
                         visible={currentValue.visible}
                         color={currentValue.color}
                         onClose={()=>{this.props.tagOnClose(currentValue, index);}}>{currentValue.tagName + currentValue.searchText}</Tag>)
                })}
            </div>
        );
    }
}

export default FilterTags;