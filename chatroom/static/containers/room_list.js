import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ChatRoomLabel from '../components/ChatRoomLabel'
import {getRoomList,requestRoomList, requestMessages,getMessages} from '../actions/index'

class RoomList extends Component{

    constructor(props) {
        super(props);
        this.socket = new WebSocket('ws://' + window.location.host + '/chatlobby/');
        this.socket.onopen =()=>{this.props.requestRoomList(this.socket)};
        this.socket.onmessage = (evt) => {this.props.getRoomList(evt.data)};
    }

    renderList() {
        if (!this.props.room_list) {
            return (<div>Loading Rooms...</div>);
        }
        return this.props.room_list.map((room) => {
            return (
                <ChatRoomLabel room_name={room['room_name']} key ={room['pk']} room_id={room['pk']} get_message_list={()=>
                {
                    var socket = new WebSocket('ws://' + window.location.host + '/chatlobby/'+room['pk']+'/');
                    socket.onopen =()=>{this.props.requestMessages(room['pk'], socket)}
                    socket.onmessage =(evt)=>{this.props.getMessages(evt.data)}
                }}/>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        room_list: state.roomList
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {   getRoomList: getRoomList,
            requestRoomList: requestRoomList,
            getMessages: getMessages,
            requestMessages: requestMessages
        }, dispatch);
}

export default  connect(mapStateToProps, matchDispatchToProps)(RoomList)