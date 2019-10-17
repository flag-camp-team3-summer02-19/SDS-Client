import React, {Component} from 'react';
import {List, Col, Row, Drawer, Steps, Popover} from 'antd';
import {ShipMethod, ShipStatus, MapThumbnail_prefix, MapThumbnail_suffix, MapApiKey} from "../Constants";
import drone from '../images/drone.png';
import mobile from '../images/auto_mobile.png';
import banana from '../images/banana.jpg';
import Order from "./Order";

const {Step} = Steps;

const convertAddressToUrl = (address) => {
    address = address.replace(/\s+,\s+/gi, ',');
    return address.replace(/\s+/gi, '+')
};

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.selectedItem = this.props.selectedItem;
        this.state = {
            visible: false,
        };
        // console.log('In OrderList: ', this.state.visible);
    }

    showDrawer = (item) => {
        this.props.updateDrawer(item, true);
    };

    onClose = () => {
        this.props.updateDrawer(null, false);
    };

    render() {
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={this.props.listData}
                    renderItem={item => (
                        <List.Item
                            key={item.OrderId}
                            actions={[
                                <span onClick={this.showDrawer.bind(this, item)}>
                                    Status: {item.Status === ShipStatus.Finished ? 'Finished' : 'In Progress'}
                                </span>
                            ]}
                            extra={
                                <img
                                    className='map-thumbnail'
                                    alt="MapThumbnail"
                                    src={MapApiKey === 'Google Map API' ?
                                        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' :
                                        MapThumbnail_prefix + convertAddressToUrl(item.CurrentLoc) + MapThumbnail_suffix + MapApiKey}
                                    onClick={this.showDrawer.bind(this, item)}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={item.OrderNote}
                            />
                            <Row className='simple-item'>
                                <Col className='simple-item-address' span={2}>
                                    From: {item.FromAddress}
                                </Col>
                                <Col span={10}>
                                    {item.ShipMethod === ShipMethod.Mobile ?
                                        <img alt='AutoMobile' src={mobile} className='simple-item-img'/> :
                                        <img alt='Drone' src={drone} className='simple-item-img'/>}
                                </Col>
                                <Col className='simple-item-address' span={2}>
                                    To: {item.ToAddress}
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.props.drawerVisible}
                >
                    {this.props.itemInDrawer ? <Order item={this.props.itemInDrawer}/> : null}
                </Drawer>
            </div>
        );
    }
}

export default OrderList;