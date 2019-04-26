import {Mongo} from 'meteor/mongo';

export const TodoJob = new Mongo.Collection('todo_job', {idGeneration: 'MONGO'});
