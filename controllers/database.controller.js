const mongoose = require('mongoose');
let URI = '';

if (process.env.ENV === 'PRODUCTION') {
    URI = process.env.DB_URI;
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
