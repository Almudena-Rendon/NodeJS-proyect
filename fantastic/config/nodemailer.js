const nodemailer = require("nodemailer");

async function main(mail) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: process.env.SMPT_PORT === 465 ? true : process.env.SMPT_SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_USER, // generated ethereal user
      pass: process.env.SMPT_PASSWORD, // generated gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Welcome to Wizarding World <arfernd@gmail.com>", // sender address
    to: mail, // list of receivers
    subject: "Welcome 🪄", // Subject line
    text: "Welcome to Wizarding World", // plain text body
    html: "<b>Welcome to Wizarding World</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { main };
