let Customer = require('../../models/crmsystem').Customer;
let CustomerSchema = require('../../schema/crmsystem').Customer;

const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';
const NOT_FOUND = 'Customer Record Not Found!';
const MIN_SEARCH_LENGTH = 3;

class CustomerService {
    getCustomers() {
        return CustomerSchema.find({}).exec();
    }

    getCustomerById(customerId) {
        return CustomerSchema.find({
            customerId: customerId
        }).exec();
    }

    getCustomersByName(customerName) {
        let searchString = new RegExp(customerName);

        return CustomerSchema.find({
            name: searchString
        }).exec();
    }

    saveCustomer(customer) {
        let customerModel = CustomerSchema(customer);

        return customerModel.save();
    }
}

module.exports = CustomerService;
