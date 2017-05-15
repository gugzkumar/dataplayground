/**
 * Created by Gagan on 2/18/2017.
 */
import React, {Component} from 'react';

//const ChatRoomLabel = () => (
class ChatMessage extends Component{
    render() {
        return(
            <div>
                <li className="left clearfix">
                         {/*<span className="chat-img1 pull-left">
                         /!*<img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" className="img-circle"/>*!/
                         </span>*/}
                    <div className="chat-body2 clearfix">
                        <strong><div className="pull-left uname-font" style={{color:this.props.color}}>{this.props.user_name}</div><div className="pull-right">{this.props.message_date}</div><br/></strong>
                        <p>{this.props.message}</p>
                    </div>
                </li>
            </div>
        )

    }
}

export default ChatMessage;