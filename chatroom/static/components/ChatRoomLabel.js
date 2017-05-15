/**
 * Created by Gagan on 2/18/2017.
 */
import React, {Component} from 'react';

//const ChatRoomLabel = () => (
class ChatRoomLabel extends Component{
    render() {
        return(
        <div>
            <li className="left clearfix"
                key={this.props.room_id}
                onClick={()=>this.props.get_message_list(this.props.room_id)}
            >
                <div className="clearfix">
                    <div className="header_sec" style={{fontSize:'20px'}}>
                        <strong className="primary-font">{this.props.room_name}</strong>
                    </div>
                    <div className="contact_sec">
                        <strong className="primary-font"></strong> <span
                        className="badge pull-right">{this.props.room_id}</span>
                    </div>
                </div>
            </li>
        </div>
        )
    }
}

export default ChatRoomLabel;