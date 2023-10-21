const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport'); 
const morgan = require('morgan');
var cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined')); 

app.use(cors());


const transporter = nodemailer.createTransport(smtpTransport({
  service:'gmail',
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Boolean(true), 
  transportMethod: 'SMTP',
  auth: {
      user: process.env.SMTP_MAIL, 
      pass: process.env.SMTP_PASSWORD,
  },
}));


app.post('/send-email', (req, res) => {
  console.log(req.body);
  const mailOptions = {
    from: req.body.formData.email,
    to:'info@redpositive.in',
    subject: "A Message from "+ req.body.formData.name,
    text:req.body.formData.message + "/n contact no.:" + req.body.formData.PhoneNumber + "/n emailid : "+ req.body.formData.email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Email not sent.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
