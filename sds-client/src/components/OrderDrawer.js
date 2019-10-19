import React, {Component} from 'react';
import Order from "./Order";
import {Drawer} from "antd";

class OrderDrawer extends Component {

    onClose = () => {
        this.props.updateDrawer(null,false);
    };

    render() {
        return (
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.props.drawerVisible}
                className='order-drawer'
            >
                <Order item={this.props.itemInDrawer}/>
            </Drawer>
        );
    }
}

export default OrderDrawer;