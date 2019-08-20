import {Meteor} from 'meteor/meteor';
import '../imports/startup/server/index.js';
import {logger} from '../imports/startup/server/logger.js'
import {getServiceInfo} from "../imports/startup/server/backend/git_version_controller_service.js";

Meteor.startup(() => {
    logger.info('Meteor app server start');

    // App Info
    WebApp.connectHandlers.use('/info', (req, res, next) => {
        logger.info("", req.connection.remoteAddress);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({api_info: getServiceInfo()}))
    });

    if (Meteor.settings.logging_folder_path === undefined) {
        logger.error("Cannot load Meteor config file.");
    }
});
