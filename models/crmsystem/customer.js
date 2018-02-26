let Utilities = require('../../utilities');
let DELIMITER = ',';
let INVALID_ARGUMENTS = "Invalid Argument(s) Specified!";

class Customer {
    constructor(id, name, address, credit, status, email, phone, remarks) {
        [
            this.id, this.name, this.address,
            this.credit, this.status, this.email,
            this.phone, this.remarks
        ] = arguments;
    }

    toString() {
        return Utilities.ObjectFormatter.format(this);
    }

    static create(csvString) {
        if (!csvString) {
            throw new Error(INVALID_ARGUMENTS);
        }

        let splittedCsvString = csvString.split(DELIMITER);
        let customer = new Customer(...splittedCsvString);

        return customer;
    }
}

module.exports = Customer;
