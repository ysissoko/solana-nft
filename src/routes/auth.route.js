const express = require('express');
const router = express.Router();
const authCtrl = require("src/controllers/auth.controller");
const asyncHandler = require('express-async-handler')

router.post('/login', asyncHandler(authCtrl.login));
router.post('/register', asyncHandler(authCtrl.register));
router.post('/refresh', asyncHandler(authCtrl.refreshToken));

module.exports = router;
