import User from "../models/User.js";

class UserController {
    static async getUserData(userId) {
        return await User.getUserData(userId);
    }

    static async all() {
        const result = await User.find();
        return result.data.data;
    }

    static async create(data) {
        data.role = 1;
        const result = await User.create(data);
        return result.data;
    }

    static async update(id, data) {
        console.log("Updating user");
        console.log(data);
        const result = await User.update(id, data);
        return result.data;
    }

    static async emailExists(email) {
        return User.emailExists(email);
    }

    static async get(id) {
        const result = await User.findById(id);
        if (result.data.message === "Success") {
            return result.data.data;
        }
        return null;
    }

    static async getRoles() {
        const result = await User.getRoles();

        return result.data.data;
    }

    /**
     * Prepare the login data to be sent to the server, and handle the response 
     * Checks the password and email. If password criteria are not met, it returns an error message
     * 
     * @param {string} email The email of the user
     * @param {string} password The password of the user
     * @returns {Promise} The response from the server
     */
    static async login(email, password) {
        email = email.toLowerCase();
        password = password.trim();
        const response = await User.login(email, password);

        if (response.data.message === "Success") {
            const accessToken = response.data.access_token;
            // store the access token as cookie
            document.cookie = `access_token=${accessToken}`;

            return {
                status: 200,
                data: response.data.data
            };
        }
        return {
            status: 500,
            data: response.data.message
        };
    }

    /**
     * Retrieve the full name of a user for a given user ID
     * @param {number} userId : User ID
     * @returns {string} : Full name of the user
     * @example 
     * const fullName = await UserController.getUserFullName(1);
     * // returns "John Doe"
     */
    static async getUserFullName(userId) {
        const user = await User.getUserData(userId);
        return `${user.data.firstName} ${user.data.lastName}`;
    }
}

export default UserController;