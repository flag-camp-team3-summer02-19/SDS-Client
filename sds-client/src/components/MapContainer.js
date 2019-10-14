import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '60%',
    height: '40%',
};

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            warehouse: [{latitude: 37.766345, longitude: -122.512029},
                {latitude: 37.797750, longitude: -122.408731},
                {latitude: 37.711729, longitude: -122.427705}]
        }
    }
    displayMarkers = () => {
        return this.state.warehouse.map((warehouse, index) => {
            return <Marker key={index} id={index} position={{
                lat: warehouse.latitude,
                lng: warehouse.longitude
            }}
                           onClick={() => console.log("You clicked me!")} />
        })
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{ lat: 37.759083, lng: -122.438112}}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyCUZbCOjk8EvMDvySVudNz-OUUE0e_N0YM'
})(MapContainer);