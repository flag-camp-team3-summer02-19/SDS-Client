import React, {Component} from 'react';
import Order from "./Order";
import {Drawer} from "antd";

class OrderDrawer extends Component {
    //TODO: we can use ajax call to fetch up-to-date info in the future
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