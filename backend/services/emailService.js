const nodemailer = require('nodemailer');

// Create transporter for SendGrid
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // Always 'apikey' when using SendGrid
    pass: process.env.SENDGRID_API_KEY, // SendGrid API Key from .env
  },
});

// Function to send the reset password email
exports.sendResetEmail = async (email, resetUrl) => {
  const mailOptions = {
    from: 'support@jnaillab.com',
    to: email, // Recipient's email
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset.</p>
           <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

  try {
    // Try to send the email and log the message ID on success
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId); // Logs the unique message ID from SendGrid
    
  } catch (error) {
    // Log and throw error if sending fails
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
