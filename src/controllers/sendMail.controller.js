const nodemailer = require('nodemailer');
const path = require('path');
const { isValidEmail } = require('../validators/email.validator');

require('dotenv').config();

const sendEmail = async (req, res) => {
  try {
    const { email_destination } = req.body;

    if (!email_destination || !isValidEmail(email_destination)) {
      return res.status(400).json({ message: 'E-mail inválido.' });
    }

    // Caminho para o arquivo HTML
    const htmlPath = path.join(__dirname, '../', 'email-template', 'future', 'index.html');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Lê o conteúdo do arquivo HTML
    const htmlContent = require('fs').readFileSync(htmlPath, 'utf-8');

    // Configuração do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email_destination,
      subject: 'Parceria ByteFuture',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).send('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).send('Erro ao enviar o e-mail.');
  }
};

module.exports = {
    sendEmail
};