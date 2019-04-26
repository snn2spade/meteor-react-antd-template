import {Meteor} from 'meteor/meteor'

const log4js = require('log4js');

let base_dir = process.cwd();
if (Meteor.settings.logging_folder_path !== undefined) {
    base_dir = Meteor.settings.logging_folder_path
}
log4js.configure({
    appenders: {
        file_info_out: {
            type: 'dateFile',
            filename: base_dir + '/' + 'info.log',
        },
        file_error_out: {
            type: 'dateFile',
            filename: base_dir + '/' + 'error.log',
        },
        only_error_filter: {type: 'logLevelFilter', appender: 'file_error_out', level: 'error'},
        std_out: {type: 'stdout'}
    },
    categories: {default: {appenders: ['file_info_out', 'std_out', 'only_error_filter'], level: 'info'}}
});

export const logger = log4js.getLogger();

// catch-all server error
const bound = Meteor.bindEnvironment((callback) => {
    callback();
});
process.on('uncaughtException', function (err) {
    bound(() => {
        logger.fatal("Server Crashed!", err);
        console.error(err.stack);
        log4js.shutdown(() => {
            process.exit(1);
        })
    });
});

// catch-all meteor error
const originalMeteorDebug = Meteor._debug;
Meteor._debug = (message, stack) => {
    const error = new Error(message);
    error.stack = stack;
    logger.error('Meteor Error!', error);
    return originalMeteorDebug.apply(this, arguments);
};
