import React, {Component} from 'react';
import {
    Collapse,
    Icon,
    Divider,
    Button
} from 'antd';
import {PACKAGEINFO_ENDPOINT, ShipMethod} from '../Constants';
import MapContainer from './MapContainer';
import {ajax} from "../util";
import {LOGIN_ENDPOINT, SELECTMETHOD_ENDPOINT} from "../Constants";

/* TODO: delete the fake data afterwards */
const packageInfo = {
    // TODO: should be passed down as props.order.packageInfo from DashBoard
    //  order should be updated by PackageInfo through this.props.updateOrder
    //  also should be updated after this step through this.props.updateOrder
    startAddress: "2499 Steiner St, San Francisco, CA 94115",
    destAddress: "50 Frida Kahlo Way, San Francisco, CA 94112",
    startAddressLat: 37.791071,
    startAddressLng: -122.437649,
    destAddressLat: 37.725609,
    destAddressLng:  -122.451544
}

// TODO: should be passed down as props.order.deliveryMethod from DashBoard
//  the update mechanism is same as order
const deliveryMethod = [
    {
        title: 'The Fastest Method',
        shipMethod: ShipMethod.Drone
    }
    ,
    {
        title: 'The Least Cost Method',
        shipMethod: ShipMethod.Mobile
    }
]
/* End of TODO */

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const onErrorMessage = "Please choose a delivery method!";
const onErrorCallBackMessage = "Can not connect to remote server";

class SelectMethod extends Component {
    constructor(props) {
        super(props);
        this.mapContainer = React.createRef();
    }
    latlng;
    // 0 --- not choose yet, 1 --- mobile, -1 --- drone
    deliveryType = 0;

    updateChoice = index => {
        this.latlng = this.mapContainer.current.onGeoCoding(packageInfo.startAddress, packageInfo.destAddress);
        console.log("inside updateChoice");
        console.log(this.latlng);
        this.deliveryType = deliveryMethod[index].shipMethod === ShipMethod.Mobile ? 1 : -1;
        this.mapContainer.current.onDeliveryTypeChange(this.deliveryType);
    }

    handleDeliveryMethod() {
        if (this.deliveryType === 0) {
            alert(onErrorMessage);
        } else {
            let req = JSON.stringify({
                user_id : this.props.username,
                startAddress: packageInfo.startAddress,
                destAddress: packageInfo.destAddress,
                startAddressLat: this.latlng[1].lat,
                startAddressLng: this.latlng[1].lng,
                destAddressLat: this.latlng[2].lat,
                destAddressLng: this.latlng[2].lng,
                deliveryType: this.deliveryType,
            });
            console.log(req);
            ajax('POST', SELECTMETHOD_ENDPOINT, req,
                (res) => {
                    let result = JSON.parse(res);
                    if (result.status === 'OK') {
                        /* TODO: update callbacks parameter  */
                        this.props.updateOrder(2);
                    }
                },
                /* TODO: update callbacks parameter  */
                () => {
                    alert(onErrorCallBackMessage);
                    this.props.updateOrder(2);
                });
        }
    }

    componentDidMount() {
        this.updateChoice(0);
    }

    render() {
        /* TODO: fill the necessary information for the current route */
        const listPanel = deliveryMethod.map((route, index) => (
            <Panel key={index} header={route.title}>
                <p>You selected the {route.title} mode!</p>
                <p>We recommended {route.shipMethod} to deliver your package!</p>
            </Panel>
        ));

        return (
            <div id="selectMethod">
                <section id="interaction-panel">
                    <Divider dashed>Review your information:</Divider>
                    <div className="package-info-brief">
                        <p> The Start Address: {packageInfo.startAddress}</p>
                        <p> The Destination: {packageInfo.destAddress}</p>
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

export default SelectMethod;