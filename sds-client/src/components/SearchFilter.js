import React, {Component} from 'react';
import {Dropdown, Icon, Menu} from "antd";

class SearchFilter extends Component {

    orderDateIncrease = () => {
        this.props.filterFunc.orderDateIncrease();
    };
    orderDateDecrease = () => {
        this.props.filterFunc.orderDateDecrease();
    };
    statusIncrease = () => {
        this.props.filterFunc.statusIncrease();
    };
    statusDecrease = () => {
        this.props.filterFunc.statusDecrease();
    };

    render() {
        const filterOptions = (
            <Menu>
                <Menu.Item key='1' onClick={this.orderDateIncrease} disabled={this.props.menuDisabled}>
                    Ordered Date <Icon type='arrow-up'/>
                </Menu.Item>
                <Menu.Item key='2' onClick={this.orderDateDecrease} disabled={this.props.menuDisabled}>
                    Ordered Date <Icon type='arrow-down'/>
                </Menu.Item>
                <Menu.Item key='3' onClick={this.statusIncrease} disabled={this.props.menuDisabled}>
                    Status <Icon type='arrow-up'/>
                </Menu.Item>
                <Menu.Item key='4' onClick={this.statusDecrease} disabled={this.props.menuDisabled}>
                    Status <Icon type='arrow-down'/>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <Dropdown overlay={filterOptions} >
                    <span> order filter<Icon type="down" /> </span>
                </Dropdown>
            </div>
        );
    }
}

export default SearchFilter;