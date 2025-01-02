const express = require('express');
const { signup,login } = require('../Controller/authController');
const {upload} =require("../middle/lol")

const router = express();

router.post('/login', login);
router.post('/signup', upload.single("picture"), signup);
module.exports = router;