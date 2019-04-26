import {logger} from "../logger.js";
import {Meteor} from "meteor/meteor";

export function getGitRevision() {
    let revision = null;
    try {
        revision = require('child_process')
            .execSync('git rev-parse HEAD')
            .toString().trim();
    }
    catch (e) {
        logger.error("Unable to get Git Revision")
    }
    return revision
}

export function getGitTag() {
    let gitTag = null;
    try {
        gitTag = require('child_process')
            .execSync('git describe')
            .toString().trim();
    }
    catch (e) {
        logger.error("Unable to get Git Tag")
    }
    return gitTag
}

export function getServiceInfo() {
    return {"revision": getGitRevision(), "tag": getGitTag(), "service_name": Meteor.settings.app_name}
}