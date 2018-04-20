const server = require('./mock-server.js');

function MockWebpackPlugin(port) {
    this.port = port;
}

MockWebpackPlugin.prototype.apply = function (compiler) {
    server(this.port);
    compiler.plugin("emit", (compilation, callback) => {
        callback();
    });
}

module.exports = MockWebpackPlugin;