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

    handlePayment() {
        let sessionId = this.sessionID;
        console.log(sessionId);
        let payment = JSON.stringify({
           paymentId : "payment404",
           token : "1234567890",
           PayerID : "neal404",
        });
        let paidOrder = JSON.stringify({
            // need to modify paymentResult according to CompleteOrder callback
            paymentResult : "payment success",
            order: {
                packageInfo : {
                    length: this.props.packageInfo.packageInfo.length,
                    width: this.props.packageInfo.packageInfo.width,
                    height: this.props.packageInfo.packageInfo.height,
                    weight: this.props.packageInfo.packageInfo.weight,
                    from: this.props.packageInfo.packageInfo.from,
                    to: this.props.packageInfo.packageInfo.to,
                    notes: this.props.packageInfo.packageInfo.notes,
                }, method: {
                    deliveryType: this.deliveryType,
                    deliveryTime: this.deliveryTime,
                    cost: this.cost,
                }}
        });
        ajax('POST', PLACEORDER_ENDPOINT, paidOrder,
            (res) => {
                let result = JSON.parse(res);
                console.log(result);
                if (result.resultCode === 3400) {
                    /* TODO: update callbacks parameter  */
                    console.log("hello after 3400");
                    alert(onSuccessfulCallBackPaymentMessage);
                    let order = ({
                            packageInfo : {
                                length: this.props.packageInfo.packageInfo.length,
                                width: this.props.packageInfo.packageInfo.width,
                                height: this.props.packageInfo.packageInfo.height,
                                weight: this.props.packageInfo.packageInfo.weight,
                                from: this.props.packageInfo.packageInfo.from,
                                to: this.props.packageInfo.packageInfo.to,
                                notes: this.props.packageInfo.packageInfo.notes,
                            }, method: {
                                deliveryType: this.deliveryType,
                                deliveryTime: this.deliveryTime,
                                cost: this.cost,
                            }}
                    );
                    this.props.updateOrder(order);
                } else if (result.resultCode != 3400) {
                     alert(onErrorCallBackPaymentMessage);
                }
            },
            /* TODO: update callbacks parameter  */
            () => {
                alert(onErrorCallBackPaymentMessage);
            }, false, [["sessionID", sessionId]], true);
    }
    render() {
        return (
            <div id="paymentMethod">
                <p>paymentMethod</p>
                <button onClick={this.handlePayment.bind(this)}> Please make a payment here! </button>
            </div>
        );
    }
}

export default withCookies(PaymentMethod);