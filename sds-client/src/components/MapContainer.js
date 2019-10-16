import React from 'react';
import { Input } from 'antd';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';

const { TextArea } = Input;

const IconWarehouse = {
    url: 'https://img.pngio.com/warehouse-free-buildings-icons-warehouse-icon-png-512_512.png',
    scaledSize: new window.google.maps.Size(30, 30),
    anchor: { x: 10, y: 10 }
}

class Map extends React.Component {

    // path[0] is the nearest warehouse, path[1] is starting address, path[2] is destination address.
    path = [
        {lat: 37.766345, lng: -122.512029},
        {lat: 37.752033, lng: -122.450996},
        {lat: 37.771944, lng: -122.446142}
    ];


    constructor(props) {
        super(props)
        this.state = {
            warehouse: [{latitude: 37.766345, longitude: -122.512029},
                {latitude: 37.797750, longitude: -122.408731},
                {latitude: 37.711729, longitude: -122.427705}],
            progress: [],
            initialDate: new Date()
        };
        this.onAddressChange = this.onAddressChange.bind(this);
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

    velocity = 700

    getDistance = () => {
        // seconds between when the component loaded and now
        const differentInTime = (new Date() - this.state.initialDate) / 1000 // pass to seconds
        return differentInTime * this.velocity // d = v*t -- thanks Newton!
    }

    onAddressChange() {
        this.path = [{lat: 37.766345, lng: -122.512029},
                {lat: 37.771944, lng: -122.446142},{lat: 37.752033, lng: -122.450996},];
        //this.setState({progress: []})
        this.setState({initialDate: new Date()});
        //this.componentDidMount();
        this.componentWillMount();
    }

    componentDidMount = () => {
        this.interval = window.setInterval(this.moveObject, 1000)
    }

    componentWillUnmount = () => {
        window.clearInterval(this.interval)
    }

    moveObject = () => {
        //console.log(this.state.addressReset)
        const distance = this.getDistance()
        console.log(distance)
        if (! distance) {
            return
        }

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
        this.path = this.path.map((coordinates, i, array) => {
            if (i === 0) {
                return { ...coordinates, distance: 0 } // it begins here!
            }
            const { lat: lat1, lng: lng1 } = coordinates
            const latLong1 = new window.google.maps.LatLng(lat1, lng1)

            const { lat: lat2, lng: lng2 } = array[0]
            const latLong2 = new window.google.maps.LatLng(lat2, lng2)

            // in meters:
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                latLong1,
                latLong2
            )

            return { ...coordinates, distance }
        })

        console.log(this.path)
    }

    render = () => {
        const IconDrone = {
            url: 'https://cdn3.iconfinder.com/data/icons/virtual-reality-and-drones/65/_Drone-512.png',
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: { x: 10, y: 10 }
        }
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 37.759083, lng: -122.438112}}
            >
                {this.displayMarkers()}
                <div/>
                <TextArea  id={"start-address"}
                           placeholder="Please enter starting address. (e.g. 4327 20th St,San Francisco,CA 94114)"
                    autosize={{ minRows: 2, maxRows: 6 }}
                />
                <div/>
                <TextArea id={"dest-address"}
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