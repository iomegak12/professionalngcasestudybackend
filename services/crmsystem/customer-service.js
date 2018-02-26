let Customer = require('../../models/crmsystem').Customer;

const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';
const NOT_FOUND = 'Customer Record Not Found!';
const MIN_SEARCH_LENGTH = 3;

class CustomerService {
    constructor() {
        this.customers =
            [
                new Customer(11, 'Northwind Traders', 'Bangalore', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(12, 'Southwind Traders', 'Bangalore', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(13, 'Eastwind Traders', 'Bangalore', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(14, 'Westwind Traders', 'Bangalore', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(15, 'Oxyrich Traders', 'Bangalore', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(16, 'Adventureworks', 'Mysore', 22000, false, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(17, 'Footmart', 'Bangalore', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(18, 'Citizen Kane', 'Mangalore', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record'),
                new Customer(19, 'ePublishers', 'Gurugram', 12000, true, 'info@email.com', '080-49834343', 'Simple Customer Record')
            ];
    }

    getCustomers() {
        let promise = new Promise(
            (resolve, reject) => {
                resolve(this.customers);
            });

        return promise;
    }

    getCustomerById(customerId) {
        let promise = new Promise(
            (resolve, reject) => {
                if (!customerId) {
                    reject({
                        status: INVALID_ARGUMENTS
                    });

                    return;
                }

                let filteredCustomer = null;

                for (let customer of this.customers) {
                    if (customer.id === customerId) {
                        filteredCustomer = customer;
                        break;
                    }
                }

                if (filteredCustomer) {
                    resolve(filteredCustomer);
                } else {
                    reject({
                        status: NOT_FOUND
                    });
                }
            });

        return promise;
    }

    getCustomersByName(customerName) {
        let promise = new Promise(
            (resolve, reject) => {
                let validation = customerName &&
                    customerName.length >= MIN_SEARCH_LENGTH;

                if (!validation) {
                    reject({
                        status: INVALID_ARGUMENTS
                    });

                    return;
                }

                let filteredCustomers = this.customers.filter(
                    customer => customer.name.indexOf(customerName) >= 0);

                resolve(filteredCustomers);
            });

        return promise;
    }

    saveCustomer(customer) {
        let promise = new Promise(
            (resolve, reject) => {
                let validation = customer &&
                    customer.name && customer.address && customer.credit;

                if (!validation) {
                    reject({
                        status: INVALID_ARGUMENTS
                    });

                    return;
                }

                this.customers.push(customer);

                resolve(true);
            });

        return promise;
    }
}

module.exports = CustomerService;
