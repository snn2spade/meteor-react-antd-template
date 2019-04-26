import React from 'react';
import PropTypes from 'prop-types';
import {Table} from "antd";
import {withTracker} from 'meteor/react-meteor-data';
import moment from 'moment';

export default class TodoJobListTable extends React.Component {
    static propTypes = {
        todo_jobs: PropTypes.array.isRequired,
        todo_job_doc_ready: PropTypes.bool.isRequired
    };

    columns = [
        {
            title: 'Job ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Created Date',
            dataIndex: 'created_date',
            key: 'created_date',
        }
    ];

    constructor(props) {
        super(props);
    }

    getDataSource() {
        if (this.props.todo_job_doc_ready) {
            let todo_jobs = this.props.todo_jobs;
            return todo_jobs.map((todo_job, index) => {
                return {
                    key: index,
                    _id: todo_job._id._str,
                    title: todo_job.title,
                    created_date: moment(todo_job.created_date).format('YYYY-MM-DD HH:mm:ss')
                }
            })
        }
        else {
            return []
        }
    }

    render() {
        return <Table columns={this.columns} dataSource={this.getDataSource()}
                      loading={!this.props.todo_job_doc_ready}/>
    }

}