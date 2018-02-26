let mongoose = require('mongoose');

let DEFAULT_MONGO_SERVER = process.env.MONGO_SERVER || 'localhost';
let DEFAULT_MONGO_PORT = process.env.MONGO_PORT || 27017;
let DEFAULT_DB_NAME = process.env.MONGO_DB || 'crmsystemdb';

class MongoInitializer {
    constructor(mongoServerName = DEFAULT_MONGO_SERVER,
        mongoServerPort = DEFAULT_MONGO_PORT, mongoDbName = DEFAULT_DB_NAME) {
        [this.mongoServerName, this.mongoServerPort, this.mongoDbName] = [mongoServerName, mongoServerPort, mongoDbName];

        let connectionString = `mongodb://${this.mongoServerName}:${this.mongoServerPort}/${this.mongoDbName}`;

        console.log(connectionString);

        mongoose.connect(connectionString);
        mongoose.Promise = Promise;
    }

    get connection() {
        return mongoose;
    }

    cleanUp() {
        if (mongoose) {
            mongoose.disconnect();
        }
    }
}

if (typeof mongoInitializer === 'undefined') {
    mongoInitializer = new MongoInitializer();
}

module.exports = mongoInitializer;
