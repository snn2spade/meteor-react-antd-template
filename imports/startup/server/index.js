import {Meteor} from "meteor/meteor";
import '../../api/todo_job/todo_job.js'
import '../../api/todo_job/server/publications.js'
import {logger} from "../../startup/server/logger.js";
import {getGitTag} from "./backend/git_version_controller_service.js";
import {createNewTodoJob} from "../../api/todo_job/methods.js";

Meteor.methods({
    getWebAppGitTag() {
        try {
            return getGitTag();
        }
        catch (e) {
            logger.error(e);
            return null;
        }
    },
    createNewTodoJob(title) {
        try {
            return createNewTodoJob(title);
        }
        catch (e) {
            logger.error(e);
            throw new Meteor.Error(e);
        }
    }
});

Meteor.startup(() => {

});