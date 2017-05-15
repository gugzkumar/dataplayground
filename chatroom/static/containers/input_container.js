import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {sendMessage} from '../actions/index'

class InputContainer extends Component{

    constructor(props){
        super(props)
        this.state={input_text: ''}

    }

    render() {
        return (
            <div className="message_write">
                <textarea className="form-control" placeholder="type a message"
                          value={this.state.input_text}
                          onChange={(evt)=>{this.setState({input_text: evt.target.value});}}
                          onKeyDown={(evt)=>{
                              if (evt.keyCode==13 && !evt.shiftKey){
                                  this.props.sendMessage(this.props.message_socket, this.state.input_text)
                                  this.setState({input_text: ''});
                              }
                          }}
                          onKeyUp={(evt)=>{
                              if (evt.keyCode==13 && !evt.shiftKey){
                                  this.setState({input_text: ''});
                              }
                          }}
                >
                </textarea>
    
                <div className="clearfix"></div>
                <div className="chat_bottom" id="send_btn_container">
                    <a href="#" className="pull-right btn btn-success"
                       onClick={()=>{
                           this.props.sendMessage(this.props.message_socket, this.state.input_text)
                           this.setState({input_text: ''})
                       }}>
                        Send</a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message_socket: state.messageSocket
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            sendMessage: sendMessage
        }, dispatch);
}

export default  connect(mapStateToProps, matchDispatchToProps)(InputContainer)