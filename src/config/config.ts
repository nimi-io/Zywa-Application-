require("dotenv").config();

export default {
  PORT: process.env.PORT || 3000,

  //EMAIL
  Host: process.env.HOST || "sandbox.smtp.mailtrap.io",
  Smtp_Port: Number(process.env.SMTP_PORT) || 2525,
  Smtp_User: process.env.SMTP_USER || "Test",
  Pass: process.env.PASS || "Test",
};
