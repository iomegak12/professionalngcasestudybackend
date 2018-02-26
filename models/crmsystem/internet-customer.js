let Customer = require('./customer');

class InternetCustomer extends Customer {
    constructor(id, name, address,
        credit, status, email, phone, remarks, blogUrl) {
        super(...arguments);

        this.blogUrl = blogUrl;
    }

    toString() {
        return super.toString();
    }
}

module.exports = InternetCustomer;
