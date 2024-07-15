import nodemailer from "nodemailer";

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: "postmaster@sandboxe04756a986974aa49cc7181219458e7a.mailgun.org",
      pass: "403c42d1fc40482717dcc8f7ddcfc34c-8a084751-b06b2d29",
    },
  });

  const mailOptions = {
    from: "                   .mailgun.org", // sender address
    to: "96cyra@gmail.com", // list of receivers
    subject: "Test Email", // Subject line
    text: "This is a test email sent using Mailgun SMTP.", // plain text body
    html: "<b>This is a test email sent using Mailgun SMTP.</b>", // html body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

sendTestEmail();
