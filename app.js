/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , cors = require('cors')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(cors());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function () {
    app.use(express.errorHandler());
});

/*
dob: Wed Oct 04 1978 00:00:00 GMT+0100
email: "mike@mike.com"
firstName: "Mike"
lastName: "Savage"
password: "password"
repeatPassword: "password"
*/

app.post('/register', function (req, res) {

var uuid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 11);

    console.log(req.body);

    res.send([{
        uuid: uuid,
        userName: req.body.firstName + ' ' + req.body.lastName,
        schoolId: 123456,
        profileImgURL: null,
        userStatus: 1
    }]);
});

/* FETCH */
app.post('/fetch', function (req, res) {

    // this is such bollocks but...
    if (req.body.key === '123456789011121314') {
        res.send([{
            uuid: '123456789011121314',
            userName: 'Mike Savage',
            schoolId: 123456,
            profileImgURL: null,
            userStatus: 1
        }]);

    } else {
        // just return a 401?
        // Send a zero len array for now...
        res.send([]);
    }
});

/* LOGIN */
app.post('/login', function (req, res) {

    // this is such bollocks but...
    if (req.body.username === 'mike@stayfriends.com' && req.body.password === 'password') {

        // userStatus
        // 0 = Free
        // 1 = Gold
        // 2 = Gold+
        // 1000 = Admin

        res.send([{
            uuid: '123456789011121314',
            userName: 'Mike Savage',
            schoolId: 123456,
            profileImgURL: null,
            userStatus: 1
        }]);

    } else {
        // just return a 401?
        // Send a zero len array for now...
        res.send([]);
    }

});

app.get('/bundesland', function (req, res) {
    res.send( require('./data/federalstates.json') );
});

app.get('/schools', function (req, res) {
    res.send( require('./data/schools.json') );
});


app.get('/towns', function (req, res) {
    res.send( require('./data/towns.json') );
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
