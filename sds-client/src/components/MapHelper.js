import React, {Component} from 'react';

class MapHelper extends Component {
    render() {
        console.log("this is inside mapHelper");
        console.log(this.props);
        return (
            <div>
                <p> hello there </p>
            </div>
        );
    }
}

export default MapHelper;