const express = require('express');

const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');

const mailRoutes = require('./src/routes/mail.routes');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.PERMITTED_ORIGIN, 
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

// Endpoint para enviar e-mail
app.use(mailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor Express rodando`);
});
