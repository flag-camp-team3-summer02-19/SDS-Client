import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import history from '../history';

class NewOrder extends Component {
    state = {
        userInfo: this.props.userInfo,
        order: {
            packageInfo: {},
            deliveryMethod: {},
            payment: {}
        },
        stepIdx: 0,
        stepRoutes: [
            "packageInfo",
            "selectMethod",
            "paymentMethod"
        ],
        pathname: history.location.pathname
    }

    /* this method will be called only when sub-components each on success state*/
    updateOrder = order => {
        this.setState(prev => ({
            order: order,
            stepIdx: prev.stepIdx + 1
        }));

        if (this.state.stepIdx < this.state.stepRoutes.length) {
            history.push(this.state.pathname + "/"
                + this.state.stepRoutes[this.state.stepIdx]);
        } else {
            /* TODO 1: newOrder is made successfully
                handle onSuccessful callback to update dashboard
                and redirect to dashboard */
            history.push("/");
        }
    }

    render() {
        return (
            <div id="newOrder">
                <Route path={this.state.pathname + "/packageInfo"}>
                    <Dummy />
                </Route>
                <Route path={this.state.pathname + "/selectMethod"}>
                    <Dummy />
                </Route>
                <Route path={this.state.pathname + "/paymentMethod"}>
                    <Dummy />
                </Route>
            </div>
        );
    }
}

export default NewOrder;