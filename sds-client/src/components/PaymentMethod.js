import React, {Component} from 'react';
import {COMPLETEORDER_ENDPOINT, PLACEORDER_ENDPOINT} from '../Constants';
import {ajax} from "../util";
import {withCookies} from "react-cookie";
import history from "../history";

const onErrorCallBackPaymentMessage = "Payment failed, order is not placed.";
const onSuccessfulCallBackPaymentMessage = "Payment success, order is placed. Thank you for your business!";

class PaymentMethod extends Component {
    constructor (props) {
        super(props);
        console.log(this.props);
        //using cookies
        this.cookies = this.props.cookies;
        //this.sessionID = undefined;
        if(this.cookies.get('sessionID')){
            this.sessionID = this.cookies.get('sessionID');
        } else {
            history.push('/');
        }
    }


    render() {
        return (
            <div id="paymentMethod">
                <p>paymentMethod</p>
                <a href={this.props.redirectURL} target="_blank">Please make a payment!</a>
                <br/>
                <button onClick={this.props.updateOrder}>Click me after payment!</button>
            </div>
        );
    }
}

export default withCookies(PaymentMethod);