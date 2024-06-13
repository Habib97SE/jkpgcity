class Validate {
    static isEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static isPassword(password) {
        const regex = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$)/
        return regex.test(password);
    }

    static isLoginValid(email, password) {
        return this.isEmail(email) && this.isPassword(password);
    }
}

export default Validate;