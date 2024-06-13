const bcrypt = require('bcrypt');


class Encrypt {
    static generateSalt() {
        return bcrypt.genSaltSync(16);
    }

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} salt 
     * @returns 
     */
    static hashPassword(email, password, salt) {
        if (salt === undefined) {
            salt = this.generateSalt();
        }
        if (salt === null) {
            salt = this.generateSalt();
        }
        if (salt === '') {
            salt = this.generateSalt();
        }
        if (password === "" || email === "") {
            return null;
        }
        return bcrypt.hashSync(email + password, salt);
    }
}

module.exports = Encrypt;