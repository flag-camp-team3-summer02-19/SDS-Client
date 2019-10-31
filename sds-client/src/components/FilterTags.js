import React, {Component} from 'react';
import {Tag, Icon} from "antd";

class FilterTags extends Component {
    render() {
        const {tags} = this.props;
        return (
            <div className="filter-tags">
                {tags.length > 0?<div className='close-all-filters-icon'><Icon width='10px' type="close-circle" onClick={this.props.onCloseAllTags} /></div> : null}
                {tags.map((currentValue, index, arr) => {
                    return (<Tag key={currentValue.tagName + currentValue.searchText}
                         closable
                         // visible={currentValue.visible}
                         color={currentValue.color}
                         onClose={()=>{this.props.onCloseTag(currentValue);}}>{currentValue.tagName + currentValue.searchText}</Tag>)
                })}
            </div>
        );
    }
}

export default FilterTags;