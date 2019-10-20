import React, {Component} from 'react';
import {Divider, Row, Steps} from "antd";
import {ShipMethod, ShipStatus, ShipMethodMap, ShipStatusMap} from "../Constants";

const {Step} = Steps;


const DescriptionItem = ({title, content}) => (
    <div className='order-description-drawer'>
        <p className='order-description-title-drawer'>{title}: </p>
        {content}
    </div>
);

class Order extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.item) {
            return (
                <div>
                    <p className='order-title-in-drawer'>Order Details</p>
                    <Row>
                        <Steps current={this.props.item.Status}
                               progressDot id='order-list-shipping-progress'
                        >
                            {Object.keys(ShipStatus).map((currValue) => (
                                <Step key={ShipStatus[currValue]} description={ShipStatusMap[ShipStatus[currValue]]}/>
                            ))}
                        </Steps>
                    </Row>
                    <br/>
                    <Row>
                        <DescriptionItem title="Shipping From" content={this.props.item.FromAddress}/>
                    </Row>
                    <Row>
                        <DescriptionItem title="Shipping To" content={this.props.item.ToAddress}/>
                    </Row>
                    <Row>
                        {this.props.item.ShipMethod === ShipMethod.Mobile ?
                            <DescriptionItem title="Shipping Method" content='Auto Mobile'/> :
                            <DescriptionItem title="Shipping Method" content='Drone'/>
                        }
                    </Row>
                    <Row>
                        <DescriptionItem title="Package Details" content={this.props.item.PackageInfo}/>
                    </Row>
                    <Row>
                        <DescriptionItem title="Package Notes" content={this.props.item.OrderNote}/>
                    </Row>
                    <Divider/>
                    <p className='order-title-in-drawer'>Map details</p>
                    <img
                        className='map-details'
                        alt="MapDetails"
                        src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                    />
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Order;