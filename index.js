const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const express = require('express');
const app = express();
const port = 3001;

const bodyParser = require('body-parser');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sendEmail = async (req, res) => {
  try {
    const { email_destination } = req.body;

    // Verifica se o e-mail é fornecido e tem um formato válido
    if (!email_destination || !isValidEmail(email_destination)) {
      return res.status(400).json({ message: 'E-mail inválido.' });
    }

    // Caminho para o arquivo HTML
    const htmlPath = path.join(__dirname, './', 'src', 'email-template', 'future', 'index.html');

    // Configuração do Nodemailer (substitua com suas próprias credenciais e configurações)
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: 'contato@bytefuture.com.br',
        pass: 'Shrek3comasuamae!',
      },
    });

    // Lê o conteúdo do arquivo HTML
    const htmlContent = require('fs').readFileSync(htmlPath, 'utf-8');

    // Configuração do e-mail
    const mailOptions = {
      from: 'contato@bytefuture.com.br',
      to: email_destination,
      subject: 'Parceria ByteFuture',
      html: htmlContent,
    };

    // Envia o e-mail
    const info = await transporter.sendMail(mailOptions);

    console.log('E-mail enviado:', info.response);
    res.status(200).send('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).send('Erro ao enviar o e-mail.');
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Endpoint para enviar e-mail
app.post('/send-email', sendEmail);

app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});
