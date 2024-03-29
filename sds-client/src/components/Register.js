import React, {Component} from 'react';

/* ref https://ant.design/components/form/ */
import {Form, Input, Button, Icon} from 'antd';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import {ajax} from '../util'
import {REGISTER_ENDPOINT} from '../Constants'

const onErrorMessage = "Sorry, there is some register issue.";

class Register extends Component {
    state = {
        confirmDirty: false
    };

    handleRegister = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let email = values.email;
                let password = md5(email + md5(values.password));
                let req = JSON.stringify({
                    email : email,
                    password : Array.from(password),
                });
                console.log(req);

                ajax('POST', REGISTER_ENDPOINT, req,
                    (res) => {
                        let result = JSON.parse(res);
                        console.log(result);
                        if (result.resultCode === 110) {
                            this.props.onSuccessRegister(false, { } );
                            alert(result.message);
                        } else {
                            alert(result.message);
                        }
                    },
                    () => { alert(onErrorMessage); },
                    false, null, true);
            }
        });
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="register">
                <h1>Super Delivery Service</h1>
                <Form onSubmit={this.handleRegister} className="register-form">
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onBlur={this.handleConfirmBlur}
                        />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            Submit
                        </Button>
                        Or <Link to="/">back to login!</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'Register' })(Register);