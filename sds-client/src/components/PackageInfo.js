import React, {Component} from 'react';
import { Input, InputNumber, DatePicker } from 'antd';
import MapContainer from "./MapContainer";
import MapHelper from "./MapHelper";

function onChange(value) {
    console.log('changed', value);
}

class DateRange extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    dateonChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.dateonChange('startValue', value);
    };

    onEndChange = value => {
        this.dateonChange('endValue', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
            </div>
        );
    }
}

class PackageInfo extends React.Component {

    render() {
        return (
            <div id="packageInfo">
                <p id={"title"}>packageinfo:</p>
                <div id="packageDetail">
                    <span> Enter package Dimension (inch * inch * inch)</span>
                    <br/>
                    <InputNumber id="length" min={1} max={100000} defaultValue={3} onChange={onChange} />
                    <InputNumber id="width" min={1} max={100000} defaultValue={3} onChange={onChange} />
                    <InputNumber id="height" min={1} max={100000} defaultValue={3} onChange={onChange} />
                    <br/>
                    <span> Enter package Weight (lbs) below</span>
                    <br/>
                    <InputNumber id="weight" min={1} max={100000} defaultValue={3} onChange={onChange} />
                    <br/>
                    <br/>
                    <span>Choose pick up date below</span>
                    <br/>
                    <DateRange />
                    <br/>
                    <button onClick={this.props.updateOrder}> Choose a delivery method </button>
                </div>
                <div id="mapDetail">
                    <MapContainer startAddressLat={37.766345} startAddressLng={-122.512029}
                                    destAddressLat={37.752033} destAddressLng={-122.450996}/>
                                    <MapHelper startAddressLat={37.766345} startAddressLng={-122.512029}
                                               destAddressLat={37.752033} destAddressLng={-122.450996}/>
                </div>

            </div>
        );
    }
}

export default PackageInfo;
// path={[{lat: 37.766345, lng: -122.512029},
// {lat: 37.752033, lng: -122.450996},
// {lat: 37.771944, lng: -122.446142}]}