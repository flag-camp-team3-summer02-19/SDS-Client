import React, {Component} from 'react';

class PackageInfo extends Component {
    render() {
        return (
            <div id="packageInfo">
                <p>packageinfo</p>
                <button onClick={this.props.updateOrder}> Trigger onSuccess callback </button>
            </div>
        );
    }
}

export default PackageInfo;