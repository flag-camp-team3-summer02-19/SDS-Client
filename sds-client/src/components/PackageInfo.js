import React from 'react';
import { InputNumber, DatePicker } from 'antd';
import DateRange from './DateRange';
import MapContainer from "./MapContainer";
import MapHelper from "./MapHelper";

function onChange(value) {
    console.log('changed', value);
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
                    {/*<MapContainer startAddressLat={37.752033} startAddressLng={-122.450996}*/}
                    {/*                destAddressLat={37.771944} destAddressLng={-122.446142}/>*/}

                    {/*deliveryType = 0 ---- Drone, deliveryType = 1 ---- Robots*/}
                                    <MapHelper startAddressLat={37.752033} startAddressLng={-122.450996}
                                               destAddressLat={37.771944} destAddressLng={-122.446142} deliveryType={1}/>
                </div>

            </div>
        );
    }
}

export default PackageInfo;
// path={[{lat: 37.766345, lng: -122.512029},
// {lat: 37.752033, lng: -122.450996},
// {lat: 37.771944, lng: -122.446142}]}