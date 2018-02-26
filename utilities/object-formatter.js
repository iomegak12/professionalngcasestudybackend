const DELIMITER = ', ';
const NO_OF_TRAIL_CHARS = 2;
const INVALID_ARGUMENTS = "Invalid Argument(s) Specified!";
const START_POS = 0;

class ObjectFormatter {
    static format(object) {
        if (!object) {
            throw new Error(INVALID_ARGUMENTS);
        }

        let formattedMessage = '';

        for (let property in object) {
            let propertyValue = object[property];

            if (typeof propertyValue !== 'function') {
                formattedMessage += `${propertyValue}${DELIMITER}`;
            }
        }

        formattedMessage = formattedMessage.substr(
            START_POS, formattedMessage.length - NO_OF_TRAIL_CHARS);

        return formattedMessage;
    }
}

module.exports = ObjectFormatter;
