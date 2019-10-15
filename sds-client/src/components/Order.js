import React, {Component} from 'react';
import {Col, Divider, Drawer, Row} from "antd";
import {ShipMethod, ShipStatus} from "../Constants";


const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

class Order extends Component {
    render() {
        return (
            <div>
                <p style={{...pStyle, marginBottom: 24}}>Order Details</p>
                <Row>
                    <DescriptionItem title="Shipping From: " content={this.props.item.FromAddress}/>
                </Row>
                <Row>
                    <DescriptionItem title="Shipping To: " content={this.props.item.ToAddress}/>
                </Row>
                <Row>
                    {this.props.item.ShipMethod === ShipMethod.Mobile ?
                        <DescriptionItem title="Shipping Method: " content='Auto Mobile'/> :
                        <DescriptionItem title="Shipping Method: " content='Drone'/>
                    }
                </Row>
                <Row>
                    {this.props.item.Status === ShipStatus.InProgress ?
                        <DescriptionItem title="Shipping Status: " content='In Progress'/> :
                        <DescriptionItem title="Shipping Status: " content='Finished'/>
                    }
                </Row>
                <Row>
                    <DescriptionItem title="Package Details: " content={this.props.item.PackageInfo}/>
                </Row>
                <Row>
                    <DescriptionItem title="Package Notes: " content={this.props.item.OrderNote}/>
                </Row>
                <Divider/>
                <p style={pStyle}>Map details</p>
                <img
                    className='map-details'
                    alt="MapDetails"
                    src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                />
            </div>
        );
    }
}

export default Order;