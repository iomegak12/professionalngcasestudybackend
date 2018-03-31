let express = require('express');
let UserProfileService = require('../../services/security').UserProfileService;
let HttpStatusCodes = require('../../utilities').HttpStatusCodes;
let JwtSignGenerator = require('../../utilities').JwtSignGenerator;

let router = express.Router();

class AuthenticationRoutingDefinition {
    constructor(globalSecretKey) {
        this.userProfileService = new UserProfileService();
        this.globalSecretKey = globalSecretKey;
        this.initializeRouting();
    }

    initializeRouting() {
        router.post('/', async (request, response) => {
            try {
                let body = request.body;
                let { userId, password } = body;
                let validationStatus = await this.userProfileService.validate(userId, password);

                if (!validationStatus) {
                    response.status(HttpStatusCodes.UNAUTHORIZED).send({
                        status: false
                    });

                    return;
                }

                let userProfile = this.userProfileService.getUserProfile(userId);
                let formattedUserProfile = {
                    profileId: userProfile.userId,
                    email: userProfile.email,
                    title: userProfile.title,
                    role: userProfile.role
                };

                let signature = JwtSignGenerator.sign(formattedUserProfile, this.globalSecretKey);

                response.status(HttpStatusCodes.OK)
                    .send({
                        token: signature
                    });
            } catch (error) {
                response
                    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                    .send({
                        status: false
                    });
            }
        });
    }

    get Router() {
        return router;
    }
}

module.exports = AuthenticationRoutingDefinition;
