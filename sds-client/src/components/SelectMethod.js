import React, {Component} from 'react';

class SelectMethod extends Component {
    render() {
        return (
            <div id="selectMethod">
                <p>selectMethod</p>
                <button onClick={this.props.updateOrder}> Trigger onSuccess callback </button>
            </div>
        );
    }
}

export default SelectMethod;