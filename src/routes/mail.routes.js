const express = require('express');
const { sendEmail } = require('../controllers/sendMail.controller');

const mailRoutes = express();

mailRoutes.post('/send-email', sendEmail)

module.exports = mailRoutes;