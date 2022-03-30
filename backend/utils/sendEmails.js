const nodemailer = require("nodemailer");
const connection = require("../config/db");
const transporter = nodemailer.createTransport({
  host: "mail.stigaoutwear.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendEmail = (email, res) => {
  try {
    connection.query(
      `select * from users where email = ?`,
      [email],
      async function (findUserErr, findUserRes) {
        if (findUserErr) {
          throw findUserErr;
        } else {
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
              res.status(200).json({ msg: "User created" });
            }
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// send votes
const sendVotes = async (users, winners, res) => {
  try {
    const mailOptions = {
      from: `Gamsil Vote <${process.env.EMAIL}>`,
      to: users,
      subject: "Gamsil election results",
      html: `
      <div style="
      padding: 20px 10px; 
      background: url(https://media.giphy.com/media/DBjacCxZrCIK217NiO/giphy.gif);
      background-repeat: no-repeat;
      background-size: cover;
      ">
        <p>The Gamsil management thank you for participating in this election voting. Here are your new executives:</p>
        <div style="
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
        ">
        ${winners
          .map(
            (winner) =>
              `<div style="margin: 10px 5px">
              <h3>${winner.name}</h3>
               <p>For: <b> <i>${winner.category}</i> <b/></p>   
            </div>`
          )
          .join("")}
        
        </div>
      </div>
      
      `,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.json({ msg: "Results released" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// send start election
const sendStartVotes = async (users, res) => {
  try {
    const mailOptions = {
      from: `Gamsil Vote <${process.env.EMAIL}>`,
      to: users,
      subject: "Gamsil election has started",
      html: `
      <div style="
        background: white;
        padding: 10px;
        ">
        <p>The Gamsil management invites you to participate in this election voting to select your upcoming elections.</p>

       <p style="font-size: 18px;"><b>Click the link or gif below to start voting:</b> </p>
       <a style="font-size: 18px;" href="${`http://localhost:3000/`}">start voting</a>
      </div>
      <div >
      <a style="width: 100%;" href="${`http://localhost:3000/`}">
      <img src="https://media.giphy.com/media/3oriNT3HeCc7vDwupG/giphy.gif" width="100%" />
      </a>
      </div>
      `,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.json({ msg: "start/stop successful" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendEmail, sendVotes, sendStartVotes };
