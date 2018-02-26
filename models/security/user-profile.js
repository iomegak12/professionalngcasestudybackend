let ObjectFormatter = require('../../utilities').ObjectFormatter;

class UserProfile {
    constructor(userId, password, email, title, role) {
        [
            this.userId, this.password,
            this.email, this.title, this.role
        ] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }
}

module.exports = UserProfile;
