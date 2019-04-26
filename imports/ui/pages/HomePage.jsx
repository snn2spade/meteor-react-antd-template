import React from 'react';
import {Row, Col, Card, Button, Input} from 'antd';
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {withTracker} from 'meteor/react-meteor-data';
import {TodoJob} from "../../api/todo_job/todo_job.js";
import TodoJobListTable from "../components/TodoJobListTable.jsx";
import iziToast from 'iziToast';
import 'izitoast/dist/css/iziToast.min.css';

class HomePage extends React.Component {
    static propTypes = {
        todo_jobs: PropTypes.array.isRequired,
        todo_job_doc_ready: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        props.setDefaultSelectedKey('1');
        this.state = {
            todo_input: ""
        };
        this.onTodoInputChange = this.onTodoInputChange.bind(this);
    }

    onClickNewTodoJob() {
        Meteor.call("createNewTodoJob", this.state.todo_input, (err, res) => {
            if (err) {
                console.log(err);
                iziToast.error({
                    title: 'Error',
                    message: 'Failed to add todo job',
                });
            }
            else {
                iziToast.success({
                    title: 'Success',
                    message: 'Added todo job!',
                });
            }
        })
    }

    onTodoInputChange(e) {
        this.setState({todo_input: e.target.value})
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <Row gutter={16} style={{marginTop: '15px'}}>
                    <Col span={12} style={{width: '100%'}}>
                        <Card
                            title={<div style={{justifyContent: "space-between", display: "flex"}}>
                                <div>Todo Job List</div>
                                <div><Input value={this.state.todo_input} onChange={this.onTodoInputChange}
                                            style={{width: "200px"}}/><Button
                                    style={{marginLeft: "5px"}}
                                    onClick={() => this.onClickNewTodoJob()}>New
                                    Todo</Button></div>
                            </div>}>
                            <TodoJobListTable todo_job_doc_ready={this.props.todo_job_doc_ready}
                                              todo_jobs={this.props.todo_jobs}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withTracker(() => {
    const todo_job_handle = Meteor.subscribe('todo_job.limit', 0, 100);
    const todo_job_doc_ready = todo_job_handle.ready();
    const todo_jobs = TodoJob.find({}, {sort: {_id: -1}}).fetch();
    return {
        todo_job_doc_ready,
        todo_jobs,
    };
})(HomePage);