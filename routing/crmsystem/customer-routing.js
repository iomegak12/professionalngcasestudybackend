let express = require('express');
let Customer = require('../../models/crmsystem').Customer;
let CustomerService = require('../../services/crmsystem').CustomerDbService;
let HttpStatusCodes = require('../../utilities').HttpStatusCodes;

const NO_RECORDS = 1;
const NEW_CUSTOMER_RECORD = 'NewCustomerRecord';

let router = express.Router();

class CustomerRoutingDefinition {
    constructor(pushNotificationService) {
        this.customerService = new CustomerService();
        this.pushNotificationService = pushNotificationService;

        this.initializeRouting();
    }

    initializeRouting() {
        router.get('/', async (request, response) => {
            let customers = await this.customerService.getCustomers();

            response.status(HttpStatusCodes.OK).send(customers);
        });

        router.get('/:customerId', async (request, response) => {
            try {
                let customerId = parseInt(request.params.customerId);
                let filteredCustomer = await this.customerService.getCustomerById(customerId);

                if (!filteredCustomer)
                    response.status(HttpStatusCodes.NOT_FOUND);
                else response.status(HttpStatusCodes.OK).send(filteredCustomer);
            } catch (error) {
                response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: error.message
                });
            }
        });

        router.get('/search/:customerName', async (request, response) => {
            try {
                let searchString = request.params.customerName;
                let filteredCustomers = await this.customerService.getCustomersByName(searchString);

                if (!filteredCustomers || filteredCustomers.length <= NO_RECORDS) {
                    response.status(HttpStatusCodes.NOT_FOUND);
                }
                else response.status(HttpStatusCodes.OK).send(filteredCustomers);
            } catch (error) {
                response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: error.message
                });
            }
        });

        router.post('/', async (request, response) => {
            try {
                let customer = request.body;

                customer.__proto__ = new Customer();

                let status = await this.customerService.saveCustomer(customer);

                if (!status) {
                    response.send(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ status });
                    return;
                }

                response.status(HttpStatusCodes.OK).send({ status });

                if (status && this.pushNotificationService) {
                    this.pushNotificationService.notify(NEW_CUSTOMER_RECORD, customer);
                }
            } catch (error) {
                response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: error.message
                });
            }
        });
    }

    get Router() {
        return router;
    }
}

module.exports = CustomerRoutingDefinition;
