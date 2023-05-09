const nodemailer = require("nodemailer");

async function main(mail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "arfernd@gmail.com", // generated ethereal user
      pass: "hejdevpajwnubgjk", // generated gmail password
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
