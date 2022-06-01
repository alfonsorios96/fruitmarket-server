const mongoose = require('mongoose');
let URI = '';

if (process.env.ENV === 'PRODUCTION') {
    if (process.env.db_by_url) {
        URI = process.env.db_url_connection
    } else if (process.env.db_srv) {
        URI = 'mongodb+srv://' + process.env.db_user + ':' + process.env.db_password + '@' + process.env.db_host + '/' + process.env.db_name + '?authSource=admin&' + process.env.db_query;
    } else {
        URI = 'mongodb://' + process.env.db_user + ':' + process.env.db_password + '@' + process.env.db_host + ':' + process.env.db_port + '/' + process.env.db_name + '?authSource=admin';
    }
} else {
    URI = 'mongodb://' + process.env.db_host + ':' + process.env.db_port + '/' + process.env.db_name;
}

mongoose.connect(URI, {
    connectTimeoutMS: 3000,
    socketTimeoutMS: 8000,
})
    .then(() => console.log('DB is connected'))
    .catch(error => console.error(error));


module.exports.mongoose = mongoose;
module.exports.URI = URI;
