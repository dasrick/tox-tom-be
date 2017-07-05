'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the packages
// ---------------------------------------------------------------------------------------------------------------------
var express = require('express');
// var bodyParser = require('body-parser');
// var morgan = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var restify = require('express-restify-mongoose');
// var opbeat = require('opbeat').start();
// var cors = require('cors');
var app = express();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// config env stuff
// ---------------------------------------------------------------------------------------------------------------------
var port = process.env.PORT || 6080;
var mongouri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
var env = process.env.NODE_ENV || 'development';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// config app
app.set('port', port);
// app.use(morgan('dev'));
// app.use(opbeat.middleware.express());
// app.use(cors());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// config body parser
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MONGOOSE
// ---------------------------------------------------------------------------------------------------------------------
//mongoose.connect(mongouri); // connect to our database
function connect() {
    var mongooptions = {
        // useMongoClient: true,
        // server: {
        //     poolSize: 4,
        //     socketOptions: {
        //         keepAlive: 1
        //     }
        // }
    };
    return mongoose.connect(mongouri, mongooptions).connection;
    // return mongoose.connect(mongouri, mongooptions);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MODELS
// ---------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
// ---------------------------------------------------------------------------------------------------------------------
// create router
var router = express.Router();

// setup restify
restify.defaults({
    prefix: '/api',
    version: '/v1',
    totalCountHeader: true
});


// import and use models
restify.serve(router, require('./src/models/offers'));

app.use(router);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// START SERVER
// ---------------------------------------------------------------------------------------------------------------------
connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen)
;


function listen() {
    //if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Node app of TOX-tom-be-API is running ...');
    console.log('Host: localhost:' + port);
    console.log('Env: ', env);
}
