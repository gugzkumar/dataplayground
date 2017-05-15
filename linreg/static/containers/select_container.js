import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getModelList, selectedModel, resultReceived} from '../actions/index'

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

class SelectContainer extends Component{
    constructor(props)
    {
        super(props)
        this.state={error: null}

        $.ajax(
            {
                url:'api/models/',
                type:'GET',
                success: (data)=>{
                    this.props.getModelList(data)
                }
            });
    }

    renderList() {
        if (!this.props.modelList) {
            return (<h1>Loading Models...</h1>);
        }
        return this.props.modelList.map((model) => {
            if(this.props.currentModel && model.get('pk') == this.props.currentModel.pk){
                return (<h3 key ={model.get('pk')} style={{backgroundColor: "green"}}>{model.get('model_name')}</h3>);
            }
            return (
                <h3 key ={model.get('pk')}
                    onClick={(event)=>{
                        $.ajax(
                            {
                                url: ('api/models/'+model.get('pk')+'/'),
                                type:'GET',
                                success: (data)=>{
                                    this.props.selectedModel(data)
                                }
                            });
                    }}>
                    {model.get('model_name')}
                </h3>
            );
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 pre-scrollable" style={{maxHeight: '200px'}}>
                    {this.renderList()}
                </div>
                <div className="col-md-4">
                    <h3></h3>
                    <textarea id="feature_text" rows="7" className="form-control" style={{resize: 'none'}}
                              value={this.state.input_text}>
                    </textarea>
                    <button className="btn btn-block btn-default"
                            disabled={!this.props.currentModel}
                        onClick={(evt)=>{
                            $.ajax(
                                {
                                    url:'api/runmodel/',
                                    type:'POST',
                                    data:{
                                        model_name: this.props.currentModel['model_name'],
                                        feature_list: ($('#feature_text').val())
                                    },
                                    success: (data)=>{
                                        this.props.resultReceived(data)
                                        this.setState({error: null});
                                    },
                                    error: (jq, status, message) => {
                                        this.setState({error: jq.responseJSON.message});
                                    }
                                });
                        }}>
                        Submit Test Data
                    </button>
                <h3></h3>
                </div>
                <div className="col-md-4">
                    <h1>Result:</h1>
                    {this.props.result ?(<h3>{this.props.result}</h3>):(<h3></h3>)}
                    {this.state.error ?(
                        <div id="result_error" className="alert alert-danger" style={{marginRight:'10px'}}>
                            <strong>Error: </strong> {this.state.error}
                        </div>
                    )
                        :(<div></div>)}

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        modelList: state.modelList,
        currentModel: state.currentModel,
        result: state.result
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            getModelList: getModelList,
            selectedModel: selectedModel,
            resultReceived: resultReceived
        }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SelectContainer)