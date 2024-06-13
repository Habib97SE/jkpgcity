const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/v1/UserController');

router.get('/', (req, res) => {
    UserController.getUsers(req, res);
});

router.post("/login", (req, res) => {
    UserController.login(req, res);
})

router.get('/:id', (req, res) => {
    UserController.getUser(req, res);
});

router.post('/', (req, res) => {
    UserController.createUser(req, res);
});


router.put('/:id', (req, res) => {
    UserController.updateUser(req, res);
});

router.delete('/:id', (req, res) => {
    userController.deleteUser(req, res);
});

module.exports = router;