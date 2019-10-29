import React from 'react';
import {DatePicker} from 'antd';

class DateRange extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    dateonChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.dateonChange('startValue', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    render() {
        const { startValue } = this.state;
        return (
            <div>
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={this.props.value}
                    placeholder="Pick Up Date"
                    onChange={this.onStartChange}
                    onChange={this.props.onChangeValue}
                    // onChange={this.onStartChange}
                    // onOpenChange={this.handleStartOpenChange}
                />
            </div>
        );
    }
}

export default DateRange;