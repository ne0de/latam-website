var moment = require('moment');

const helpers = {};

helpers.convertUntilNow = (datetime) => {
    moment.locale('es');
    var time = new moment(datetime);
    var untilNow = time.fromNow(true);
    return untilNow;
}

module.exports = helpers;