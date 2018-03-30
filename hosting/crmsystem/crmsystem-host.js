let http = require('http');
let express = require('express');
let expressJwt = require('express-jwt');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let CustomerRoutingDefinition = require('../../routing/crmsystem').CustomerRoutingDefinition;
let AuthenticationRoutingDefinition = require('../../routing/security').AuthenticationRoutingDefinition;
let PushNotificationService = require('../../services/push-notifications').PushNotificationService;

let HttpStatusCodes = require('../../utilities').HttpStatusCodes;
let RandomGenerator = require('../../utilities').RandomGenerator;

morgan.token('id', () => RandomGenerator.generate());

const API_CUSTOMERS_DEFINITION = '/api/customers';
const API_AUTH_DEFINITION = '/authenticate';
const INVALID_PORT = 'Invalid Port Definition Specified!';
const INVALID_SECRET_KEY = 'Invalid Secret Key Specified!';

class CRMSystemHost {
    constructor(portNumber, globalSecretKey) {
        if (!portNumber) {
            throw new Error(INVALID_PORT);
        }

        if (!globalSecretKey) {
            throw new Error(INVALID_SECRET_KEY);
        }

        this.portNumber = portNumber;
        this.globalSecretKey = globalSecretKey;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.pushNotificationService = new PushNotificationService(this.httpServer);
        this.customerRouting = new CustomerRoutingDefinition(this.pushNotificationService);
        this.authenticationRouting = new AuthenticationRoutingDefinition();

        this.initializeMiddleware();
    }

    initializeMiddleware() {
        this.app.use(this.handleUnauthorizedError);
        this.app.use(this.applyCors);
        /// this.app.use(API_CUSTOMERS_DEFINITION, expressJwt({
        ///    secret: this.globalSecretKey
        /// }));
        this.app.use(bodyParser.json());
        this.app.use(morgan(':id :method :url :response-time'));
        this.app.use(API_CUSTOMERS_DEFINITION, this.customerRouting.Router);
        this.app.use(API_AUTH_DEFINITION, this.authenticationRouting.Router);
        this.app.use('/public', express.static(`public`));
    }

    handleUnauthorizedError(error, request, response, next) {
        if (error && error.constructor.name === 'UnauthorizedError') {
            response.status(HttpStatusCodes.UNAUTHORIZED);

            return;
        }

        next();
    }

    applyCors(request, response, next) {
        response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next();
    }

    startServer() {
        let promise = new Promise(
            (resolve, reject) => {
                this.httpServer.listen(this.portNumber, () => {
                    resolve();
                });
            });

        return promise;
    }

    stopServer() {
        let promise = new Promise((resolve, reject) => {
            this.httpServer.close(() => {
                resolve();
            });
        });

        return promise;
    }
}

module.exports = CRMSystemHost;
