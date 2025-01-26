const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const FormData = require('../models/leads'); // Import the FormData model




const fetchMailContent = ({ email }) => {
   return `Sabyasachi here from Crenovent. Looking forward to connecting for a demo!

Do you mind sharing a bit more context about what you're looking to learn? I want to make sure I've got the right people on the call for you.

Also, what's your schedule look like for a demo in the next few days and beyond?

Regards,

Best,
Sabyasachi

Sabyasachi | Inside Sales
${email} | 9038055910 | www.crenovent.in
E-Square, Plot No. C2, Sector 96, Noida, Uttar Pradesh 201303
`
}

const handleLeads = async (req, res) => {
   const jsonPayload = req.body;
   const {email,name,size,phone,message}=jsonPayload;
   console.log(email,'email')

   // Save form data to MongoDB using the imported model
   const newFormData = new FormData({ name, email, size, phone, message });

   try {
      await newFormData.save(); // Save to database

      // Configure Nodemailer transport
      const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com', // Outlook SMTP server
         port: 465,
         secure: true,
         auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
         }
      });

      // Email options
      const mailOptions = {
         from: process.env.USER_EMAIL, // Sender address
         to: email, // List of recipients
         subject: `Let's Connect: Demo Request for Crenovent Technologies`,
         text: fetchMailContent({ email })
      };

      await transporter.sendMail(mailOptions); // Send email
      res.send('Email sent successfully and data saved!'); // Response to user
   } catch (error) {
      console.error(error);
      res.status(500).send('Error saving data or sending email.');
   }
}

module.exports = { handleLeads };