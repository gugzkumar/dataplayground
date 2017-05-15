import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createdModel} from '../actions/index'


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


class CreateContainer extends Component{
    constructor(props)
    {
        super(props)
        this.state={error: null,
                    success: null}
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12" id="create_model">
                    <label>Model Name:</label>
                    <input type="text" className="form-control" id="name_field"/>
                    <label>Training Data (.csv):</label>
                    <label className="custom-file form-control">
                        <input type="file" id="file_field" className="custom-file-input"/>
                        <span className="custom-file-control"></span>
                    </label>
                    {this.state.success ?(
                        <div id="result_success" className="alert alert-success" style={{marginRight:'10px'}}>
                            <strong>Success: </strong> {this.state.success}
                        </div>
                    ):(<div></div>)}
                    {this.state.error ?(
                        <div id="result_error" className="alert alert-danger" style={{marginRight:'10px'}}>
                            <strong>Error: </strong> {this.state.error}
                        </div>
                    ):(<div></div>)}
                    <button className="btn btn-block btn-default" onClick={
                        (evt)=>{
                            var form_data = new FormData()
                            form_data.append('model_name', $('#name_field').val());
                            ($('#file_field')[0].files.length>0 ? form_data.append('csv_file', $('#file_field')[0].files[0]) : null);
                            $('#name_field')[0].disabled=true
                            $('#file_field')[0].disabled=true
                            $.ajax(
                                {
                                    url:'api/models/',
                                    type:'POST',
                                    data:form_data,
                                    processData: false,
                                    contentType: false,
                                    success: (data)=>{
                                        this.props.createdModel(data)
                                        this.setState({error: null, success: 'Model "'+data.model_name+'" Created'});
                                        $('#name_field')[0].value=''
                                        $('#file_field')[0].value=null
                                        $('#name_field')[0].disabled=false
                                        $('#file_field')[0].disabled=false
                                    },
                                    error: (jq, status, message) => {
                                        this.setState({error: jq.responseText, success:null});
                                        $('#name_field')[0].disabled=false
                                        $('#file_field')[0].disabled=false
                                    }
                                });
                        }
                    }>Create New Model</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            createdModel: createdModel
        }, dispatch);
}


export default connect(mapStateToProps,matchDispatchToProps)(CreateContainer)