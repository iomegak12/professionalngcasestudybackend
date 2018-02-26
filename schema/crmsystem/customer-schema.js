let mongoose = require('../../utilities').MongoInitializer.connection;
let randomGenerator =require('../../utilities').RandomGenerator;
let Schema = mongoose.Schema;

let customerSchema = new Schema({
    customerId: Number,
    name: String,
    address: String,
    credit: Number,
    status: Boolean,
    email: String,
    phone: String,
    remarks: String
});

customerSchema.pre('save', (next) => {
    this.customerId = randomGenerator.generate();

    next();
});

let Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;
