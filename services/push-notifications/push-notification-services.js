let socketIO = require('socket.io');
let RandomGenerator = require('../../utilities').RandomGenerator;

const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';

class PushNotificationService {
    constructor(httpServer) {
        this.httpServer = httpServer;

        this.sio = socketIO.listen(this.httpServer);
        this.initializeSocketServer();
    }

    initializeSocketServer() {
        this.sio.on('connection', socketClient => {
            socketClient.clientId = RandomGenerator.generate();

            console.log(`Socket Client ${socketClient.clientId} Connected ...`);

            socketClient.on('disconnect', () => {
                console.log(`Socket Client ${socketClient.clientId} Disconnected ...`);
            });
        });
    }

    notify(eventName, eventData) {
        let validation = this.sio && eventName && eventData;

        if (!validation)
            throw new Error(INVALID_ARGUMENTS);

        this.sio.emit(eventName, eventData);
    }
}

module.exports = PushNotificationService;
