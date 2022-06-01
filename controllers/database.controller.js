const mongoose = require('mongoose');
let URI = '';

if (process.env.ENV === 'PRODUCTION') {
    URI = 'mongodb+srv://' + process.env.db_user + ':' + process.env.db_password + '@' + process.env.db_host + '/' + process.env.db_name + '?authSource=admin&' + process.env.db_query;
} else {
    URI = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
}

mongoose.connect(URI, {
    connectTimeoutMS: 3000,
    socketTimeoutMS: 8000,
})
    .then(() => console.log('DB is connected'))
    .catch(error => console.error(error));


module.exports.mongoose = mongoose;
module.exports.URI = URI;
