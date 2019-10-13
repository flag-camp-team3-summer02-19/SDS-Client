import React, {Component} from 'react';

class PaymentMethod extends Component {
    render() {
        return (
            <div id="paymentMethod">
                <p>paymentMethod</p>
                <button onClick={this.props.updateOrder}> Trigger onSuccess callback </button>
            </div>
        );
    }
}

export default PaymentMethod;