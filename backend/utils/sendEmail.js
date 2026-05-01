import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create a transporter
  // For production, use service like SendGrid, Mailgun, or your own SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: `AdPromoter <no-reply@adpromoter.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // Check if credentials exist
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ WARNING: Email credentials missing. Email not sent.');
    return;
  }

  // Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
