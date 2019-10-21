import React, {Component} from 'react';
import Order from "./Order";
import {Drawer} from "antd";
import {MapApiKey, MapThumbnail_prefix, MapThumbnail_suffix, ShipStatus} from "../Constants";
import {ajax, convertAddressToUrl} from "../util";

class OrderDrawer extends Component {

    state = {
        mapLoc: {},
    };

    //TODO: we can use ajax call to fetch up-to-date info in the future
    onClose = () => {
        this.props.updateDrawer(null,false);
    };

    afterVisibleChange = (visible) => {
        if(visible) {
            //TODO: do not need to fetch data from server if this.props.itemInDrawer.Status === ShipStatus.Finished
            const CURRENT_LOC_ENDPOINT = "https://google.com";
            this.setState({mapLoc:{}});
            ajax('GET', CURRENT_LOC_ENDPOINT, null,
                (rt) => {
                    if(rt.status == "OK") {
                        //TODO: refine the code below based on backend implementation
                        const mapLoc = {curLat:rt.curLat, curLon:rt.curLon, destLat:rt.destLat, destLon:rt.destLon};
                        this.setState({mapLoc: mapLoc});
                    }
                },
                () => {
                    console.log("ajax call for map details failed on item: " + this.props.itemInDrawer.OrderId);
                    //TODO: the follosing is just a demo, will be deleted in the final release
                    const mapLoc = {curLat:37.720015, curLon:-122.458905, destLat:37.771944, destLon:-122.446142};
                    this.setState({mapLoc: mapLoc});
            })
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
                <Order item={this.props.itemInDrawer} mapLoc={this.state.mapLoc}/>
            </Drawer>
        );
    }
}

export default OrderDrawer;