import config from "../config/config";
import { ResultFunction } from "./utils";
import enums from "../types/lib/index";
import nodemailer from "nodemailer";
import Transport from "nodemailer-brevo-transport";

class EmailSender {
  private client: nodemailer.Transporter;

  constructor() {
    console.log(config);
    this.client = nodemailer.createTransport({
      host: config.Host,
      port: config.Smtp_Port,
      auth: {
        user: config.Smtp_User,
        pass: config.Pass,
      },
    });
  }

  async sendEmail(
    attachments: any,
    to: string,
    subject: string,
    htmlBody?: string,
    cc = "ibukunoluwaodunsi@gmail.com"
  ) {
    const email = this.client.sendMail({
      to,
      cc,
      subject,
      html: htmlBody,
      attachments,
    });
  }
}

export default EmailSender;
