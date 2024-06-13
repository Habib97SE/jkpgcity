const User = require('../../models/v1/User');
const Validate = require('../../utils/Validate');
const Encrypt = require('../../utils/Encrypt');
const {
    Op
} = require('sequelize');


class UserController {

    /**
     * Retrieve a list of users 
     * @param {Express.Request} req : Request object
     * @param {Express.Response} res : Response object 
     * @returns : Promise<void> : A list of users
     */
    async getUsers(req, res) {
        let queryOptions = {
            where: {},
            order: []
        };
        const page = parseInt(req.query.page, 10) || 1; // Default to first page
        const pageSize = parseInt(req.query.pageSize, 10) || 10; // Default to 10 items per page
        queryOptions.limit = pageSize;
        queryOptions.offset = (page - 1) * pageSize;

        if (pageSize > 50) {
            res.status(400).json({
                message: 'Page size must not exceed 50'
            });
            return;
        }


        if (req.query.firstName) {
            queryOptions.where.firstName = req.query.firstName;
        }
        if (req.query.lastName) {
            queryOptions.where.lastName = req.query.lastName;
        }
        if (req.query.email) {
            queryOptions.where.email = req.query.email;
        }
        if (req.query.sort) {
            const [field, direction] = req.query.sort.split(',');
            if (['firstName', 'lastName', 'email', 'createdAt'].includes(field) && ['ASC', 'DESC'].includes(direction.toUpperCase())) {
                queryOptions.order.push([field, direction]);
            }
        }

        try {
            const {
                count,
                rows: users
            } = await User.findAndCountAll(queryOptions);
            users.forEach(user => {
                user.dataValues.links = {
                    self: {
                        href: `api/v1/users/${user.userId}`,
                        method: 'GET'
                    },
                    update: {
                        href: `api/v1/users/${user.userId}`,
                        method: 'PUT'
                    },
                    delete: {
                        href: `api/v1/users/${user.userId}`,
                        method: 'DELETE'
                    }
                }
            });
            const totalPages = Math.ceil(count / pageSize);
            res.status(200).json({
                message: "Success",
                data: users,
                pagination: {
                    totalItems: count,
                    currentPage: page,
                    pageSize: pageSize,
                    totalPages: totalPages
                }
            })
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async getUser(req, res) {
        try {
            const userId = req.params.id;
            if (!Validate.isNumber(userId)) {
                res.status(400).json({
                    message: 'Invalid user id'
                });
                return;
            }
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(404).json({
                    message: 'User not found',
                });
                return;
            }
            user.dataValues.links = {
                self: {
                    href: `api/v1/users/${user.userId}`,
                    method: 'GET'
                },
                update: {
                    href: `api/v1/users/${user.userId}`,
                    method: 'PUT'
                },
                delete: {
                    href: `api/v1/users/${user.userId}`,
                    method: 'DELETE'
                }
            }
            res.status(200).json({
                message: "Success",
                data: user
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async createUser(req, res) {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                roleId: req.body.role
            }
            if (!Validate.newUser(user)) {
                res.status(400).json({
                    message: 'Invalid user'
                });
                return;
            }
            const salt = Encrypt.generateSalt();
            user.password = Encrypt.hashPassword(user.password, salt);
            user.salt = salt;
            const newUser = await User.create(user);
            res.status(201).json({
                message: "Success",
                data: newUser
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                res.status(400).json({
                    message: 'Email and password are required'
                });
                return;
            }
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if (!user) {
                res.status(404).json({
                    message: 'User not found'
                });
                return;
            }
            const hash = Encrypt.hashPassword(email, password, user.salt);
            if (hash === null) {
                res.status(500).json({
                    message: 'Internal server error.'
                });
                return;
            }
            if (hash !== user.password) {
                res.status(401).json({
                    message: 'Invalid credentials'
                });
                return;
            }
            res.status(200).json({
                message: 'Success',
                data: user
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(404).json({
                    message: 'User not found'
                });
                return;
            }
            user.update(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            if (!Validate.isValidId(req.params.userId)) {
                res.status(400).json({
                    message: 'Invalid user id'
                });
                return;
            }
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(404).json({
                    message: 'User not found'
                });
                return;
            }
            user.destroy();
            res.status(204).json();
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = new UserController();