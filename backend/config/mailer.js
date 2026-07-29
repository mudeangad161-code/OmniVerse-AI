const nodemailer = require("nodemailer");
console.log("📧 mailer.js loaded");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Mail Error:", error);
  } else {
    console.log("✅ Mail Server Ready");
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"OmniVerse AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email Send Failed");
    console.error(err);
    throw err;
  }
};

module.exports = sendEmail;