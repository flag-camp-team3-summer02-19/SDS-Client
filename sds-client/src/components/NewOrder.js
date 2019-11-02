import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import history from '../history';
import PackageInfo from './PackageInfo'
import SelectMethod from './SelectMethod'
import PaymentMethod from './PaymentMethod'

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
        ]
    }

    onSuccessPackageInfo = values => {
        this.setState({
            loggedIn: true,
            userInfo: values
        });
        history.push('/');
    };

    /* this method will be called only when sub-components each on success state*/
    updateOrder = order => {
        this.setState(prev => {
            if (prev.stepIdx + 1 < prev.stepRoutes.length) {
                history.replace(this.props.pathname + "/"
                    + prev.stepRoutes[prev.stepIdx + 1]);
            } else {
                /* TODO 1: newOrder is made successfully
                    handle any onSuccessful callback to update dashboard
                    and redirect to dashboard */
                history.push("/");
            }

            return {
                order: order,
                stepIdx: prev.stepIdx + 1
            };
        });
    }

    componentDidMount() {
        /* initialize the steps */
        history.replace(this.props.pathname + "/" + this.state.stepRoutes[0]);
    }

    render() {
        return (
            <div id="newOrder">
                <Route path={this.props.pathname + "/packageInfo"} exact>
                    <PackageInfo updateOrder={this.updateOrder} userInfo={this.props.userInfo} />
                </Route>
                <Route path={this.props.pathname + "/selectMethod"} exact>
                    <SelectMethod updateOrder={this.updateOrder} userInfo={this.props.userInfo} packageInfo={this.state.order}/>
                </Route>
                <Route path={this.props.pathname + "/paymentMethod"} exact>
                    <PaymentMethod updateOrder={this.updateOrder} userInfo={this.props.userInfo} />
                </Route>
            </div>
        );
    }
}

export default NewOrder;