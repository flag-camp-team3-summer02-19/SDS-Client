import React, {Component} from 'react';
import {
    Collapse,
    Icon,
    Divider,
    Button
} from 'antd';
import {ShipMethod, PACKAGEINFO_ENDPOINT, SELECTMETHOD_ENDPOINT} from '../Constants';
import MapContainer from './MapContainer';
import {ajax} from "../util";
import history from "../history";
import {withCookies} from "react-cookie";

// /* TODO: delete the fake data afterwards */
// const packageInfo = {
//     // TODO: should be passed down as props.order.packageInfo from DashBoard
//     //  order should be updated by PackageInfo through this.props.updateOrder
//     //  also should be updated after this step through this.props.updateOrder
//     startAddress: "2499 Steiner St, San Francisco, CA 94115",
//     destAddress: "50 Frida Kahlo Way, San Francisco, CA 94112",
//     startAddressLat: 37.791071,
//     startAddressLng: -122.437649,
//     destAddressLat: 37.725609,
//     destAddressLng:  -122.451544
// }

// TODO: should be passed down as props.order.deliveryMethod from DashBoard
//  the update mechanism is same as order
// const deliveryMethod = [
//     {
//         title: 'The Fastest Method',
//         shipMethod: ShipMethod.Drone,
//         displayMethod: "drone"
//     }
//     ,
//     {
//         title: 'The Least Cost Method',
//         shipMethod: ShipMethod.Mobile,
//         displayMethod: "mobile"
//     }
// ];
/* End of TODO */

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const onErrorMessage = "Please choose a delivery method!";
const onErrorCallBackMessage = "Can not connect to remote server";

class SelectMethod extends Component {
    deliveryMethod;
    constructor(props) {
        super(props);
        console.log(this.props);
        this.deliveryMethod = [
            {
                title: 'The Fastest Method',
                // shipMethod: this.props.packageInfo.packageInfo.methods.fastest.deliveryType,
                shipMethod: ShipMethod.Drone,
                displayMethod: "drone",
                cost: this.props.packageInfo.packageInfo.methods.fastest.cost,
                time: "" + new Date(this.props.packageInfo.packageInfo.methods.fastest.deliveryTime),
                date: this.props.packageInfo.packageInfo.methods.fastest.deliveryTime
            }
            ,
            {
                title: 'The Least Cost Method',
                // shipMethod: this.props.packageInfo.packageInfo.methods.cheapest.deliveryType,
                shipMethod: ShipMethod.Mobile,
                displayMethod: "mobile",
                cost: this.props.packageInfo.packageInfo.methods.cheapest.cost,
                time: "" + new Date(this.props.packageInfo.packageInfo.methods.cheapest.deliveryTime),
                date: this.props.packageInfo.packageInfo.methods.cheapest.deliveryTime
            }
        ];
        this.mapContainer = React.createRef();
        this.cookies = this.props.cookies;
        //this.sessionID = undefined;
        if(this.cookies.get('sessionID')){
            this.sessionID = this.cookies.get('sessionID');
        } else {
            history.push('/');
        }
    }
    latlng;
    // 0 --- not choose yet, 1 --- mobile, -1 --- drone
    deliveryType = ShipMethod.Both;
    deliveryTime = 0;
    cost = 0;

    updateChoice = index => {
        this.latlng = this.mapContainer.current.onGeoCoding(this.props.packageInfo.packageInfo.from, this.props.packageInfo.packageInfo.to);
        console.log("inside updateChoice");
        console.log(this.latlng);
        this.deliveryType = this.deliveryMethod[index].shipMethod;
        this.deliveryTime = this.deliveryMethod[index].date;
        this.cost = this.deliveryMethod[index].cost;
        this.mapContainer.current.onDeliveryTypeChange(this.deliveryType);
    }

    handleDeliveryMethod() {
        if (this.deliveryType === ShipMethod.Both) {
            alert(onErrorMessage);
        } else {
            let order = ({
                packageInfo: {
                    // startAddressLat: this.latlng[1].lat,
                    // startAddressLng: this.latlng[1].lng,
                    // destAddressLat: this.latlng[2].lat,
                    // destAddressLng: this.latlng[2].lng,
                    length: this.props.packageInfo.packageInfo.length,
                    width: this.props.packageInfo.packageInfo.width,
                    height: this.props.packageInfo.packageInfo.height,
                    weight: this.props.packageInfo.packageInfo.weight,
                    from: this.props.packageInfo.packageInfo.from,
                    to: this.props.packageInfo.packageInfo.to,
                    notes: this.props.packageInfo.packageInfo.notes,
                }, method: {
                    deliveryType: this.deliveryType,
                    deliveryTime: this.deliveryTime,
                    cost: this.cost,
                }}
            );
            console.log(order);
            let sessionID = this.sessionID;
            console.log(sessionID);
            this.props.updateOrder(order);
            // ajax('POST', SELECTMETHOD_ENDPOINT, order,
            //     (res) => {
            //     console.log(res);
            //         // let result = JSON.parse(res);
            //         let updatedOrder = ({
            //             packageInfo: {
            //                 // startAddressLat: this.latlng[1].lat,
            //                 // startAddressLng: this.latlng[1].lng,
            //                 // destAddressLat: this.latlng[2].lat,
            //                 // destAddressLng: this.latlng[2].lng,
            //                 length: this.props.packageInfo.packageInfo.length,
            //                 width: this.props.packageInfo.packageInfo.width,
            //                 height: this.props.packageInfo.packageInfo.height,
            //                 weight: this.props.packageInfo.packageInfo.weight,
            //                 from: this.props.packageInfo.packageInfo.from,
            //                 to: this.props.packageInfo.packageInfo.to,
            //                 notes: this.props.packageInfo.packageInfo.notes,
            //             }, method: {
            //                 deliveryType: this.deliveryType,
            //                 deliveryTime: this.deliveryTime,
            //                 cost: this.cost,
            //             }}
            //         );
            //         this.props.updateOrder(updatedOrder);
            //         // if (result.resultCode === 150) {
            //         //     /* TODO: update callbacks parameter  */
            //         //     this.props.updateOrder(order);
            //         // }
            //     },
            //     /* TODO: update callbacks parameter, updated...  */
            //     () => {
            //         alert(onErrorCallBackMessage);
            //     },false, [["sessionID", sessionID]], true);
        }
    }

    componentDidMount() {
        this.updateChoice(0);
    }

    render() {
        /* TODO: fill the necessary information for the current route */
        const listPanel = this.deliveryMethod.map((route, index) => (
            <Panel key={index} header={route.title}>
                <p>You selected the {route.title} mode!</p>
                <p>We would use {route.displayMethod} to deliver your package!</p>
                <p>The package cost is {route.cost}</p>
                <p>The estimated delivery time is {route.time}</p>
            </Panel>
        ));

        return (
            <div id="selectMethod">
                <section id="interaction-panel">
                    <Divider dashed>Review your information:</Divider>
                    <div className="package-info-brief">
                        <p> The Start Address: {this.props.packageInfo.packageInfo.from}</p>
                        <p> The Destination: {this.props.packageInfo.packageInfo.to}</p>
                    </div>
                    <Divider dashed>Choose a delivery method:</Divider>
                    <Collapse
                        accordion={true}
                        onChange={this.updateChoice}
                        bordered={true}
                        defaultActiveKey={['0']}
                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
                    >
                        {listPanel}
                    </Collapse>
                    <Divider dashed />
                    <ButtonGroup>
                        <Button type="primary" disabled>
                            <Icon type="left" />
                            Previous
                        </Button>
                        <Button type="primary" onClick={this.handleDeliveryMethod.bind(this)}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </ButtonGroup>
                </section>
                <section className="map-container">
                    <MapContainer ref={this.mapContainer} />
                </section>
            </div>
        );
    }
}

export default withCookies(SelectMethod);
