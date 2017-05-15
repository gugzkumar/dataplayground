/**
 * Created by Gagan on 2/19/2017.
 */
import React, {Component} from 'react';

class SendButton extends Component{
    render() {
        return(
            <a href="#" className="pull-right btn btn-success" onClick={this.props.send_message}>Send</a>
        )
    }
}

export default SendButton;
