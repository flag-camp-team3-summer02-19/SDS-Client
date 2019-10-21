import React from 'react';
//import { Map, GoogleApiWrapper, Marker, Polyline,} from 'google-maps-react';
//import {DirectionsRenderer} from "react-google-maps";
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker, DirectionsRenderer } from 'react-google-maps';


const IconWarehouse = {
    url: 'https://img.pngio.com/warehouse-free-buildings-icons-warehouse-icon-png-512_512.png',
    scaledSize: new window.google.maps.Size(30, 30),
    anchor: { x: 10, y: 10 }
}

const IconDrone = {
    url: 'https://cdn3.iconfinder.com/data/icons/virtual-reality-and-drones/65/_Drone-512.png',
    scaledSize: new window.google.maps.Size(30, 30),
    anchor: { x: 10, y: 10 }
}

const IconRobot = {
    url: 'https://cdn.iconscout.com/icon/free/png-256/robot-97-415007.png',
    scaledSize: new window.google.maps.Size(30, 30),
    anchor: { x: 10, y: 10 }
}

class Map extends React.Component {
    path = [
        {lat: 0, lng: 0, distance: 0},
        {lat: 0, lng: 0, distance: 0}
    ];
    // path = [
    //     {lat: 37.752033, lng: -122.450996},
    //     {lat: 37.771944, lng: -122.446142}
    // ];

    warehouse= [
        {latitude: 37.766345, longitude: -122.512029},
        {latitude: 37.797750, longitude: -122.408731},
        {latitude: 37.711729, longitude: -122.427705}
    ];

    deliveryType= -1;
    constructor(props) {
        super(props);
        var mPath = this.props.props;
        this.path[0].lat = this.props.props.startAddressLat;
        this.path[0].lng = this.props.props.startAddressLng;
        this.path[1].lat = this.props.props.destAddressLat;
        this.path[1].lng = this.props.props.destAddressLng;

        this.deliveryType = this.props.props.deliveryType;

        this.state = {
            directions: {},
        };
        this.displayRobotsRoute = this.displayRobotsRoute.bind(this);
    }

    displayMarkers = () => {
        return this.warehouse.map((warehouse, index) => {
            return <Marker icon={IconWarehouse} key={index} id={index} position={{
                lat: warehouse.latitude,
                lng: warehouse.longitude
            }}
                           onClick={() => console.log("You clicked me!")} />
        })
    }

    displayRobotsRoute() {
        const directionsService = new window.google.maps.DirectionsService();
        // console.log("inside robots route");
        // console.log(this.path[0].lat);
        // console.log(this.path[0].lng);
        // console.log(this.path[1].lat);
        // console.log(this.path[1].lng);
        var request = {
            origin: new window.google.maps.LatLng(this.path[0].lat, this.path[0].lng),
            destination: new window.google.maps.LatLng(this.path[1].lat, this.path[1].lng),
            travelMode: 'DRIVING'
        };
        directionsService.route(request, (response, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({directions: response});
            } else {
                console.log(`error fetching directions ${response}`);
            }
        });
    }

    render() {
        this.displayRobotsRoute();
        return (
            <GoogleMap
                zoom={12}
                defaultCenter={{ lat: 37.759083, lng: -122.438112}}
            >
                {this.displayMarkers()}
                {this.deliveryType==0 && <Polyline path={this.path} options={{ strokeColor: "#FF0000 " }} />}
                {this.deliveryType==0 && <Marker icon={IconDrone} position={this.path[0]} />}
                {this.deliveryType==1 && this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
                {this.deliveryType==1 && <Marker icon={IconRobot} position={this.path[0]} />}
            </GoogleMap>
        );
    }
}

const MapHelper= withScriptjs(withGoogleMap(Map))

export default (props) => {
    return (<MapHelper
        props={props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUZbCOjk8EvMDvySVudNz-OUUE0e_N0YM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `400px`, width: '800px'}}/>}
        mapElement={<div style={{height: `100%`}}/>}
    />);
}
