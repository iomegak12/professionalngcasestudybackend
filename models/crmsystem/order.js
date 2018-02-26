let Utilities = require('../../utilities');

class Order {
    constructor(orderId, orderDate, customerId,
        billingAddress, shippingAddress, units, amount, remarks) {
        [
            this.orderId, this.orderDate, this.customerId,
            this.billingAddress, this.shippingAddress,
            this.units, this.amount, this.remarks
        ] = arguments;
    }

    toString() {
        return Utilities.ObjectFormatter.format(this);
    }
}

module.exports = Order;
