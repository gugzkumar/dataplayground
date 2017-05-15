/**
 * Created by Gagan on 2/19/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChatRoomTitle extends Component{
    render() {
        return(
            <button><i className="fa fa-plus-square-o" aria-hidden="true"></i>{this.props.room_name}</button>
        )
    }
}

function mapStateToProps(state) {
    return {
        room_name: state.roomName
    };
}

export default connect(mapStateToProps)(ChatRoomTitle)