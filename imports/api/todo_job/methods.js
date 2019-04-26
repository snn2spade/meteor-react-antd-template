import {TodoJob} from "./todo_job.js";
import {ObjectID} from "mongodb";
import {Mongo} from "meteor/mongo";


export const createNewTodoJob = (title) => {
    let todo_job = {
        _id: new Mongo.ObjectID((new ObjectID()).toString()),
        title: title,
        created_date: new Date()
    };
    return TodoJob.insert(todo_job);
};