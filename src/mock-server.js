var express = require('express');
var returnData = require('./mock-handle.js');

module.exports = function (port) {
    const mockPort = port || 3000;
    var app = express();
    app.use((req, res, next) => {
        console.log(req.path);
        if (/^\/*$/.test(req.path)) {
            return res.json({ message: 'not support'});
        } else {
            next();
        }
    });
    app.use(returnData);

    var server = app.listen(mockPort, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Mock server listening at http://%s:%s', host, port);
    });
}
