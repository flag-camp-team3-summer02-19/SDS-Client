import React, {Component} from 'react';
import Order from "./Order";
import {Drawer} from "antd";
import {MapApiKey, MapThumbnail_prefix, MapThumbnail_suffix} from "../Constants";
import {ajax, convertAddressToUrl} from "../util";

class OrderDrawer extends Component {

    state = {
        mapDetailsUrl: null,
    };

    //TODO: we can use ajax call to fetch up-to-date info in the future
    onClose = () => {
        this.props.updateDrawer(null,false);
    };

    afterVisibleChange = (visible) => {
        if(visible) {
            const thumbnailUrl = MapApiKey === 'Google Map API' ?
                'https://images.unsplash.com/photo-1534050359320-02900022671e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' :
                MapThumbnail_prefix + convertAddressToUrl(this.props.itemInDrawer.CurrentLoc) + MapThumbnail_suffix + MapApiKey;
            ajax('GET', thumbnailUrl, null,
                (rt) => {
                    const base64 = btoa(new Uint8Array(rt).reduce((data, byte) => data + String.fromCharCode(byte),'',),);
                    this.setState({mapDetailsUrl: 'data:;base64,' + base64});
                },() => {console.log("ajax call for map details failed on item: " + this.props.itemInDrawer.OrderId);}, true);
        } else {
            //TODO: delete this line later
            this.setState({mapDetailsUrl: null})
        }
    };

    render() {
        return (
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this.onClose}
                afterVisibleChange={this.afterVisibleChange}
                visible={this.props.drawerVisible}
                className='order-drawer'
            >
                <Order item={this.props.itemInDrawer} mapDetailsUrl={this.state.mapDetailsUrl}/>
            </Drawer>
        );
    }
}

export default OrderDrawer;