import React, {Component} from 'react';
import {Tag, Button} from "antd";

class FilterTags extends Component {
    render() {
        const {tags} = this.props;
        return (
            <div className="filter-tags">
                {tags.length > 0?<Button onClick={()=> {console.log("clear")}}>clear all</Button>:null}
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