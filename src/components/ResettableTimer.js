import React from 'react';
import CountDown from 'react-countdown-clock'

class ResettableTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completions: 0
        }
    }

    onComplete = () => {
        this.setState(
            {
                completions: this.state.completions + 1
            }, this.props.fetchCurrencies
        )
    };

    render() {
        return (
            <div>
                <CountDown
                    key={this.state.completions}
                    seconds={15}
                    color="#000"
                    alpha={0.9}
                    size={80}
                    onComplete={this.onComplete}
                />
            </div>
        )
    }
}

export default ResettableTimer
