import React, {Component} from 'react';
import Order from "./Order";
import {Drawer} from "antd";
import {ajax} from "../util";
import {ORDER_DETAILS_ENDPOINT} from '../Constants';

class OrderDrawer extends Component {

    constructor(props) {
        super(props);
        this.item = this.props.itemInDrawer;
        this.state = {
            mapLoc: {},
        };
    }

    onClose = () => {
        this.props.updateDrawer(null,false);
    };

    afterVisibleChange = (visible) => {
        if(visible) {
            this.setState({mapLoc:{}});
            ajax('GET', ORDER_DETAILS_ENDPOINT+"/"+this.props.itemInDrawer.OrderId, null,
                (rt) => {
                    let result = JSON.parse(rt);
                    if(result.status === "OK") {
                        this.item = {
                            OrderId: this.props.itemInDrawer.OrderId,
                            OrderNote: result.packageInfo.notes,
                            FromAddress: result.packageInfo.from,
                            ToAddress: result.packageInfo.to,
                            ShipMethod: result.method.deliveryType,
                            Status: result.method.deliveryStatus,
                            OrderedTime: this.props.itemInDrawer.OrderedTime,
                            PackageInfo: result.packageInfo.length + ' x ' + result.packageInfo.width + ' x ' + result.packageInfo.height + ', ' + result.packageInfo.weight + ' lbs',
                            DeliveryTime: result.method.deliveryTime,
                            Cost: result.method.cost,
                        };
                        const mapLoc = {
                            curLat:result.locationsLatLon.current.lat,
                            curLon:result.locationsLatLon.current.lon,
                            destLat:result.locationsLatLon.to.lat,
                            destLon:result.locationsLatLon.to.lon};

                        this.setState({mapLoc: mapLoc});
                    } else { // sessionID is invalid
                        this.props.onLogout();
                    }
                },
                () => {
                    console.log("ajax call for map details failed on item: " + this.props.itemInDrawer.OrderId);
                    this.props.onLogout();
                    // //TODO: the follosing is just a demo, will be deleted in the final release
                    // const mapLoc = {curLat:37.720015, curLon:-122.458905, destLat:37.771944, destLon:-122.446142};
                    // this.setState({mapLoc: mapLoc});
                }, false, this.props.ajaxHeader, false)
        } else {
            //TODO: delete this line later
            this.setState({mapDetailsUrl: null})
        }
    };

    render() {
        return (
            <Drawer
                width={610}
                placement="right"
                closable={false}
                onClose={this.onClose}
                afterVisibleChange={this.afterVisibleChange}
                visible={this.props.drawerVisible}
                className='order-drawer'
            >
                <Order item={this.item} mapLoc={this.state.mapLoc}/>
            </Drawer>
        );
    }
}

export default OrderDrawer;