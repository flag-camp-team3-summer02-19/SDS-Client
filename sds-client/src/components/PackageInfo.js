import React from 'react';
import { InputNumber, DatePicker } from 'antd';
import DateRange from './DateRange';
import MapContainer from "./MapContainer";
import { Input } from 'antd';
import Geocode from "react-geocode";
import MapHelper from "./MapHelper";
import {GoogleMap} from "react-google-maps";

const { TextArea } = Input;

function onChange(value) {
    console.log('changed', value);
}

class PackageInfo extends React.Component {
    startAddress= "";
    destAddress= "";

    constructor (props) {
        super (props);
        this.state = {
            warehouse: [{latitude: 37.766345, longitude: -122.512029},
                {latitude: 37.797750, longitude: -122.408731},
                {latitude: 37.711729, longitude: -122.427705}],

            initialDate: new Date(),
            startAddressLat: 0,
            startAddressLng: 0,
            destAddressLat: 0,
            destAddressLng: 0,
            wareHouseLat: 0,
            wareHouseLng: 0,

            startAddress: "",
            destAddress: "",
        };
        this.onAddressChange = this.onAddressChange.bind(this);
        this.mapContainer = React.createRef();
    }

    startAddressTextChange(event) {
       this.startAddress = event.target.value;
       // this.setState({startAddress: event.target.value});
    }

    destAddressTextChange(event) {
      this.destAddress = event.target.value;
      //  this.setState({destAddress: event.target.value});
    }

    onAddressChange() {
        this.mapContainer.current.onGeoCoding(this.startAddress, this.destAddress);
        this.mapContainer.current.resetInitialDate();
    }

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
                    <br/>
                    <span> Enter package Weight (lbs) below</span>
                    <br/>
                    <InputNumber id="weight" min={1} max={100000} defaultValue={3} onChange={onChange} />
                    <br/>
                    <br/>
                    <div/>
                    <TextArea  id={"start-address"} onChange={this.startAddressTextChange.bind(this)}
                               placeholder="Please enter starting address. (e.g. 4327 20th St,San Francisco,CA 94114)"
                               autosize={{ minRows: 2, maxRows: 6 }}
                    />
                    <div/>
                    <br/>
                    <TextArea id={"dest-address"} onChange={this.destAddressTextChange.bind(this)}
                              placeholder="Please enter destination address. (e.g. 3832 21th St,San Francisco,CA 94114)"
                              autosize={{ minRows: 2, maxRows: 6 }}
                    />
                    <br/>
                    <br/>
                    <button id={"address-confirm"} onClick={this.onAddressChange} > Address Confirm </button>
                    <br/>
                    <br/>
                    <span>Choose pick up date below</span>
                    <br/>
                    <DateRange />
                    <br/>
                    <br/>
                    <button onClick={this.props.updateOrder}> Choose a delivery method </button>
                </div>
                <div id="mapDetail">
                    {/*<MapContainer   wareHouseLat={this.state.wareHouseLat} wareHouseLng={this.state.wareHouseLng}*/}
                    {/*                startAddressLat={this.state.startAddressLat} startAddressLng={this.state.startAddressLng}*/}
                    {/*                destAddressLat={this.state.destAddressLat} destAddressLng={this.state.destAddressLng}*/}
                    {/*                startAddress={this.state.startAddress} destAddress={this.state.destAddress}/>*/}
                    <MapContainer ref={this.mapContainer} />
                    {/*deliveryType = 0 ---- Drone, deliveryType = 1 ---- Robots*/}
                    {/*                <MapHelper startAddressLat={37.752033} startAddressLng={-122.450996}*/}
                    {/*                           destAddressLat={37.771944} destAddressLng={-122.446142} deliveryType={1}/>*/}
                </div>

            </div>
        );
    }
}

export default PackageInfo;
// path={[{lat: 37.766345, lng: -122.512029},
// {lat: 37.752033, lng: -122.450996},
// {lat: 37.771944, lng: -122.446142}]}