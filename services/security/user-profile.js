let UserProfile = require('../../models/security').UserProfile;

const INVALID_CREDENTIALS = 'Invalid Credentials Specified!';

class UserProfileService {
    constructor() {
        this.userProfiles =
            [
                new UserProfile('USR100011', 'admin@123', 'user100011@email-info.com', 'Executive', 'IT'),
                new UserProfile('USR100012', 'admin@123', 'user100012@email-info.com', 'Executive', 'IT'),
                new UserProfile('USR100013', 'admin@123', 'user100013@email-info.com', 'Executive', 'IT'),
                new UserProfile('USR100014', 'admin@123', 'user100014@email-info.com', 'Executive', 'IT'),
                new UserProfile('USR100015', 'admin@123', 'user100015@email-info.com', 'Executive', 'IT'),
                new UserProfile('USR100016', 'admin@123', 'user100016@email-info.com', 'Executive', 'IT')
            ];
    }

    getUserProfile(userProfileId) {
        let filteredUserProfile = null;

        for (let profile of this.userProfiles) {
            if (profile.userId === userProfileId) {
                filteredUserProfile = profile;
                break;
            }
        }

        return filteredUserProfile;
    }

    validate(userProfileId, password) {
        let promise = new Promise(
            (resolve, reject) => {
                let validation = userProfileId && password;

                if (!validation) {
                    reject({
                        status: INVALID_CREDENTIALS
                    });

                    return;
                }

                let userProfile = this.getUserProfile(userProfileId);

                if (!userProfile) {
                    reject({
                        status: INVALID_USER_PROFILE
                    });

                    return;
                }

                let authenticationStatus = userProfile.userId === userProfileId &&
                    userProfile.password === password;

                resolve(authenticationStatus);
            });

        return promise;
    }
}

module.exports = UserProfileService;
