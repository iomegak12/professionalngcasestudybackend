let minimist = require('minimist')(process.argv.slice(2), {
    boolean: true
});

const DEFAULT_PORT = process.env.PORT_NUMBER;
const DEFAULT_SECRET_KEY = process.env.SECRET_KEY;

let CRMSystemHost = require('./hosting/crmsystem').CRMSystemHost;
let portNumber = minimist.portNumber || DEFAULT_PORT;
let globalSecretKey = minimist.globalSecretKey || DEFAULT_SECRET_KEY;
let host = new CRMSystemHost(portNumber, globalSecretKey);

host.startServer()
    .then(
        success => console.log('REST Service Started Successfully!'),
        error => console.log('Unable to start the REST Service ...' + JSON.stringify(error)));

let stopServer = () => {
    if (host) {
        host.stopServer()
            .then(
                success => console.log('REST Service Stopped Successfully!'),
                error => console.log('Unable to stop the REST Service ...'));

        process.exit();
    }
};

process.on('SIGINT', stopServer);
process.on('exit', stopServer);
process.on('uncaughtException', stopServer);
