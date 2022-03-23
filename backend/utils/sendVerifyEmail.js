const nodemailer = require("nodemailer");
const connection = require("../config/db");

const sendEmail = (email) => {
  try {
    connection.query(
      `select * from users where email = ?`,
      [email],
      async function (findUserErr, findUserRes) {
        if (findUserErr) {
          throw findUserErr;
        } else {
          const transporter = nodemailer.createTransport({
            host: "mail.stigaoutwear.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            },
          });

          const mailOptions = {
            from: `Gamsil Vote <${process.env.EMAIL}>`,
            to: email,
            subject: "Verify your email",
            html: `
            <div style="padding: 20px 10px;">
              <p>You have been registered to vote in the gamsil upcoming election.</p>
              <p>However, if your email is not verified you cannot vote.</p>
              <br />
              <p><b>Visit the link below to verify your email: </b></p>
              <a href="${`http://localhost:3000/verify/${findUserRes[0].id}`}"">http://localhost:3000/verify/${
              findUserRes[0].id
            }</a>
            </div>
            
            `,
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendEmail };
