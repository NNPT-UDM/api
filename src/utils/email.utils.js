const nodemailer = require("nodemailer");
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  NODE_ENV,
  SENDGRID_USERNAME,
  SENDGRID_PASSWORD,
} = require("../configs/app.configs");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.profile?.display_name.split(" ")[0];
    this.url = url;
    this.from = `Wrdevs <${EMAIL_FROM}>`;
  }

  newTransport() {
    // 1) Create a transport
    if (NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: SENDGRID_USERNAME,
          pass: SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject, content) {
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: content,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Natours Family!");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", `Your password reset token (valid for only 10 minutes) \n ${this.url}`);
  }
}

module.exports.Email = Email;
