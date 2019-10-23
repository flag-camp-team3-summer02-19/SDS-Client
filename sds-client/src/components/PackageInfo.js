import React from 'react';
import { InputNumber, DatePicker } from 'antd';
import DateRange from './DateRange';
import MapContainer from "./MapContainer";
import { Input } from 'antd';
import SelectMethod from "./SelectMethod";
// import {PACKAGEINFO_ENDPOINT} from "../Constants";
// import md5 from 'md5';
// import { ajax } from '../util';
import Geocode from "react-geocode";
import MapHelper from "./MapHelper";
import {GoogleMap} from "react-google-maps";

const { TextArea } = Input;
const onErrorAddress = "Please enter valid starting / destination address";
const onErrorMessage = "Please verify your package info";

class PackageInfo extends React.Component {
    packageLength= 0;
    packageWidth= 0;
    packageHeight= 0;
    packageWeight= 0;

    startAddress= "";
    destAddress= "";

    pickupDate= null;

    constructor (props) {
        super (props);
        console.log(this.packageLength);
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
            startValue: null,
        };
        this.onAddressChange = this.onAddressChange.bind(this);
        this.handlePackageInfo = this.handlePackageInfo.bind(this);
        this.mapContainer = React.createRef();
    }

    onChangeLength(value) {
        this.packageLength = value;
    }

    onChangeWidth(value) {
        this.packageWidth = value;
    }

    onChangeHeight(value) {
        this.packageHeight = value;
    }

    onChangeWeight(value) {
        this.packageWeight = value;
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
        if(this.startAddress === "" || this.destAddress === "") {
            alert(onErrorAddress);
        } else {
            this.mapContainer.current.onGeoCoding(this.startAddress, this.destAddress);
            this.mapContainer.current.resetInitialDate();
        }
    }

    onPickupDateChange = (value) => {
        this.setState({startValue: value});
        //this.pickupDate = value;
    };

    handlePackageInfo() {
        console.log(this.state.startValue);
        if (this.packageLength <= 0 || this.packageWidth <= 0 || this.packageHeight <= 0 || this.packageWeight <= 0 ||
            this.startAddress === "" || this.destAddress === "" || this.state.startValue === null) {
            alert(onErrorMessage);
        } else {
            // return this.props.updateOrder;
            // this.props.onSuccessPackageInfo({
            //     packageLength: this.packageLength,
            //     packageWidth: this.packageWidth,
            //     packageHeight: this.packageHeight,
            //     packageWeight: this.packageWeight,
            //     startAddress: this.startAddress,
            //     destAddress: this.destAddress,
            //     // pickupDate: this.pickupDate,
            // });
            // this.props.updateOrder;
        }
    }


    render() {
        return (
            <div id="packageInfo">
                <div id="packageDetail">
                    <p id={"title"}>PackageInfo:</p>
                    <span> Enter package Dimension (inch * inch * inch)</span>
                    <br/>
                    <InputNumber id="length" min={0} max={100000} defaultValue={0} onChange={this.onChangeLength.bind(this)} />
                    <InputNumber id="width" min={0} max={100000} defaultValue={0} onChange={this.onChangeWidth.bind(this)} />
                    <InputNumber id="height" min={0} max={100000} defaultValue={0} onChange={this.onChangeHeight.bind(this)} />
                    <br/>
                    <br/>
                    <span> Enter package Weight (lbs) below</span>
                    <br/>
                    <InputNumber id="weight" min={0} max={100000} defaultValue={0} onChange={this.onChangeWeight.bind(this)} />
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
                    {/*<DateRange value={this.pickupDate} onChangeValue={this.onPickupDateChange}/>*/}
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" value={this.state.startValue}
                        placeholder="Pick Up Date" onChange={this.onPickupDateChange.bind(this)} />
                    <br/>
                    <br/>
                    {/*<button onClick={this.props.updateOrder}> Choose a delivery method </button>*/}
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