import React, {Component} from 'react';
import {List, Col, Row, Skeleton} from 'antd';
import {ShipMethod, ShipStatusMap} from "../Constants";
import drone from '../assets/images/drone.png';
import mobile from '../assets/images/auto_mobile.png';

class OrderList extends Component {
    //The data in list will always use new data (from this.props)
    //So, date will be updated once new data (from this.props) is passed in.

    constructor(props) {
        super(props);
        this.selectedItem = this.props.selectedItem;
        this.state = {
            visible: false,
        };
        // console.log('In OrderList: ', this.state.visible);
        this.emptyData = [
            {OrderId: '',}]
    }

    showDrawer = (item) => {
        this.props.updateDrawer(item, true);
    };

    render() {
        const loading = !this.props.listData; //undefined data means loading data, while empty(length=0) means no data
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={loading ? this.emptyData : this.props.listData}
                renderItem={item => (
                    <List.Item
                        key={item.OrderId}
                        actions={!loading && [
                            <span onClick={this.showDrawer.bind(this, item)}>
                                Status: {ShipStatusMap[item.Status]}
                            </span>,
                            <span onClick={this.showDrawer.bind(this, item)}>
                                Tracking Number: {item.OrderId.toString().toUpperCase()}
                            </span>
                        ]}
                        extra={
                            !loading && (
                                <img
                                    className='map-thumbnail'
                                    alt="MapThumbnail"
                                    src={item.thumbImgSource}
                                    onClick={this.showDrawer.bind(this, item)}
                                />)
                        }
                    >
                        <Skeleton loading={loading} active>
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
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}

export default OrderList;