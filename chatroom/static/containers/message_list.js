import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ChatMessage from '../components/ChatMessage'
import {getRoomList,requestRoomList, requestMessages,getMessages} from '../actions/index'
import ChatRoomTitle from '../components/ChatRoomTitle'
import ReactDOM from 'react-dom'

class MessageList extends Component{
    constructor(props)
    {
        super(props)
        var node= $('.chat_area')[0]
        //this.state={shouldScroll : true}
    }

    componentWillUpdate() {
        //console.log(1,this.state.shouldScroll)
        //console.log($('.chat_area')[0].offsetHeight, $('.chat_area')[0].scrollTop, $('.chat_area')[0].scrollHeight)
        //var currScrollPos = Math.ceil($('.chat_area')[0].offsetHeight+$('.chat_area')[0].scrollTop+10)
        //var shouldScroll = ($('.chat_area')[0].scrollHeight <= currScrollPos)
        //this.state={shouldScroll : shouldScroll}
        //var shouldScroll= ($('.chat_area')[0].scrollTop == $('.chat_area')[0].scrollHeight);
    }

    componentDidUpdate() {
        /*
        if(this.state.shouldScroll){
            var node= $('.chat_area')[0]
            node.scrollTop = node.scrollHeight
        }
        */
        node.scrollTop = node.scrollHeight
    }


    renderList() {
        if (!this.props.message_list) {
            return (<div>Select a room...</div>);
        }

        return this.props.message_list.map((message) => {
            if(message.get('user_name') in this.props.user_color){
                var c = this.props.user_color[message.get('user_name')]
            }
            else {
                var c = 'black'
            }
            return (
                    <ChatMessage color={c}
                        user_name={message.get('user_name')}
                        message_date={message.get('message_date')}
                        message = {message.get('message')}
                        key ={message.get('pk')}
                    />

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
        message_list: state.messageList,
        user_color: state.userToColorList
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

export default  connect(mapStateToProps, matchDispatchToProps)(MessageList)