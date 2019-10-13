import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import md5 from 'md5';

/* More Features to consider:
 *   1. remember me box:
 *        {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
 *   2. forget password button:
 *        <a className="login-form-forgot" href="">
            Forgot password
          </a>
 */
class LogIn extends Component {
    handleLogIn = e => {
        /* prevent fields no filled */
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let username = values.username;
                let password = md5(username + md5(values.password));
                /* TODO 1: add http request log in here */

                /* TODO 2: fill in param to pass on successful log in */
                this.props.onSuccessLogIn({
                    userid: 1,
                    session: 2,
                    username: values.username
                });
            }
        });
    };

    /* TODO 3: fill in hyper-ref in <a href=""> register now </a> */
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <h1>Super Delivery Service</h1>
                <Form onSubmit={this.handleLogIn} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'normal_login' })(LogIn);