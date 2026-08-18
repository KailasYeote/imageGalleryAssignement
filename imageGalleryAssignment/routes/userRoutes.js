const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const {verifyToken} =require('../config/jwt')

router.post('/gallery/saveuser', controller.saveUser);

router.get('/gallery/getuser', verifyToken,controller.getUser);

router.post('/gallery/login', controller.userLogin);

router.put('/gallery/updateprofile',verifyToken, controller.updateUser)

module.exports = router;