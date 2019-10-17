import React from 'react';
import { Input } from 'antd';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import Geocode from "react-geocode";

const { TextArea } = Input;

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

class Map extends React.Component {

    // path[0] is the nearest warehouse, path[1] is starting address, path[2] is destination address.
    path = [
        {lat: 37.766345, lng: -122.512029, distance: 0},
        {lat: 37.752033, lng: -122.450996, distance: 0},
        {lat: 37.771944, lng: -122.446142, distance: 0}
    ];

    constructor(props) {
        super(props)
        this.state = {
            warehouse: [{latitude: 37.766345, longitude: -122.512029},
                {latitude: 37.797750, longitude: -122.408731},
                {latitude: 37.711729, longitude: -122.427705}],
            progress: [],
            initialDate: new Date(),
            startAddress: "",
            destAddress: ""
        };
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onGeoCoding = this.onGeoCoding.bind(this);
    }

    displayMarkers = () => {
        return this.state.warehouse.map((warehouse, index) => {
            return <Marker icon={IconWarehouse} key={index} id={index} position={{
                lat: warehouse.latitude,
                lng: warehouse.longitude
            }}
                           onClick={() => console.log("You clicked me!")} />
        })
    }

    velocity = 50

    getDistance = () => {
        // seconds between when the component loaded and now
        const differentInTime = (new Date() - this.state.initialDate) / 1000 // pass to seconds
        return differentInTime * this.velocity // d = v*t -- thanks Newton!
    }

    onGeoCoding() {
        Geocode.setApiKey("AIzaSyCUZbCOjk8EvMDvySVudNz-OUUE0e_N0YM");

        // set response language. Defaults to english.
        Geocode.setLanguage("en");

        // set response region. Its optional.
        // A Geocoding request with region=es (US).
        Geocode.setRegion("us");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();

        // Get address from latidude & longitude.
        Geocode.fromAddress(this.state.startAddress).then(
            response => {
                //this.path[1] = response.results[0].geometry.location;
                let{lat, lng} = response.results[0].geometry.location;
                console.log(lat, lng);
                this.path[1].lat = lat;
                this.path[1].lng = lng;
                console.log(this.path);
                let minDistance = 100000000;
                for(let i = 0; i < 3; i++) {
                    console.log("insight-for-loop")
                    let lat1 = this.state.warehouse[i].latitude;
                    let lng1 = this.state.warehouse[i].longitude;
                    console.log(lat1);
                    console.log(lng1);
                    let latLong1 = new window.google.maps.LatLng(lat1, lng1)
                    let lat2 = lat;
                    let lng2 = lng;
                    let latLong2 = new window.google.maps.LatLng(lat2, lng2)

                    // in meters:
                    let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                        latLong1,
                        latLong2
                    )
                    console.log(distance);
                    // if distance is the minimum one
                    if (distance < minDistance) {
                        minDistance = distance;
                        this.path[0].lat = lat1;
                        this.path[0].lng = lng1;
                        console.log("this is the min distance coords")
                        console.log(lat1);
                        console.log(lng1);
                    }
                }
            },
            error => {
                console.error(error);
            }
        );
        Geocode.fromAddress(this.state.destAddress).then(
            response => {
                const{lat, lng} = response.results[0].geometry.location;
                console.log(lat, lng);
                this.path[2].lat = lat;
                this.path[2].lng = lng;
                console.log(this.path);
            },
            error => {
                console.error(error);
            }
        );

    }

    startAddressTextChange(event) {
        this.setState({startAddress: event.target.value})
    }

    destAddressTextChange(event) {
        this.setState({destAddress: event.target.value})
    }

    onAddressChange() {
        this.path = [{lat: 37.766345, lng: -122.512029},{lat: 37.771944, lng: -122.446142},{lat: 37.752033, lng: -122.450996},];
        //this.setState({progress: []})
        this.setState({initialDate: new Date()});
        this.onGeoCoding();
        //this.componentDidMount();
        this.componentWillMount();
    }

    componentDidMount = () => {
        this.interval = window.setInterval(this.moveObject, 1000);
    }

    componentWillUnmount = () => {
        window.clearInterval(this.interval)
    }

    moveObject = () => {

        const distance = this.getDistance()
        //this.path[1].distance needs to be further revised to destination warehouse distance.
        if (! distance || distance > this.path[2].distance + this.path[1].distance) {
            return
        }
        console.log(distance)
        let progress = this.path.filter(coordinates => coordinates.distance < distance)

        const nextLine = this.path.find(coordinates => coordinates.distance > distance)
        if (! nextLine) {
            this.setState({ progress })
            return // it's the end!
        }
        const lastLine = progress[progress.length - 1]

        const lastLineLatLng = new window.google.maps.LatLng(
            lastLine.lat,
            lastLine.lng
        )

        const nextLineLatLng = new window.google.maps.LatLng(
            nextLine.lat,
            nextLine.lng
        )

        // distance of this line
        const totalDistance = nextLine.distance - lastLine.distance
        const percentage = (distance - lastLine.distance) / totalDistance

        const position = window.google.maps.geometry.spherical.interpolate(
            lastLineLatLng,
            nextLineLatLng,
            percentage
        )

        progress = progress.concat(position)
        this.setState({ progress })
    }

    componentWillMount = () => {
        this.onGeoCoding();
        console.log("hello")
        console.log(this.path)

        for(let i = 0; i < 3; i++) {
            if (i === 0) {
                this.path[i].distance = 0;
            }
            const lat1 = this.path[i].lat;
            const lng1 = this.path[i].lng;
            const latLong1 = new window.google.maps.LatLng(lat1, lng1)
            const lat2 = this.path[0].lat;
            const lng2 = this.path[0].lng;
            const latLong2 = new window.google.maps.LatLng(lat2, lng2)

            // in meters:
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                latLong1,
                latLong2
            )
            this.path[i].distance = distance;
        }
    }

    render = () => {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 37.759083, lng: -122.438112}}
            >
                {this.displayMarkers()}
                <div/>
                <TextArea  id={"start-address"} onChange={this.startAddressTextChange.bind(this)}
                           placeholder="Please enter starting address. (e.g. 4327 20th St,San Francisco,CA 94114)"
                    autosize={{ minRows: 2, maxRows: 6 }}
                />
                <div/>
                <TextArea id={"dest-address"} onChange={this.destAddressTextChange.bind(this)}
                          placeholder="Please enter destination address. (e.g. 3832 21th St,San Francisco,CA 94114)"
                    autosize={{ minRows: 2, maxRows: 6 }}
                />
                <button id={"address-confirm"} onClick={this.onAddressChange}> Address Confirm </button>

                { this.state.progress && (
                    <>
                        <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 "}} />
                        <Marker icon={IconDrone} position={this.state.progress[this.state.progress.length - 1]} />
                    </>
                )}
                {/*<Polyline path={this.path} options={{ strokeColor: "#FF0000 " }} />*/}
                {/*<Marker icon={IconDrone} position={this.path[this.path.length - 1]} />*/}
            </GoogleMap>
        )
    }
}

const MapContainer = withScriptjs(withGoogleMap(Map))

export default () => (
    <MapContainer
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: '800px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)