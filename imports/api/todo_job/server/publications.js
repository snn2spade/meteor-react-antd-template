import {Meteor} from "meteor/meteor";
import {TodoJob} from "../todo_job.js";

if (Meteor.isServer) {
    Meteor.publish('todo_job.limit', function (skip, limit) {
        console.log("Call Published data todo job  with skip=", skip, ", limit=", limit);
        return TodoJob.find({}, {
            sort: {_id: -1},
            disableOplog: true,
            pollingIntervalMs: 2000,
            limit: limit,
            skip: skip
        });
    });
}
