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
              <a href="${`https://vote.stigaoutwear.com/verify/${findUserRes[0].id}`}"">https://vote.stigaoutwear.com/verify/${
              findUserRes[0].id
            }</a>
            </div>
            
            `,
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.status(400).json({
                errors: [
                  {
                    msg: "Could not send emails out",
                  },
                ],
              });
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
          .map((winner) =>
            winner
              ? `<div style="
              margin: 10px 5px;
              display: flex;
              ">
              <img src="https://vote.stigaoutwear.com/${winner.image}" style="width: 75px; height: 75px; object-fit: cover;" />
              <div style="padding: 7px 15px;">
              <h3 style="margin-bottom: 3px">${winner.name}</h3>
               <p>  <i>${winner.category}</i> </p> 
              </div>  
            </div>`
              : null
          )
          .join("")}
        
        </div>
      </div>
      
      `,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).json({
          errors: [
            {
              msg: "Could not send emails out",
            },
          ],
        });
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
        <p>The Gamsil management invites you to participate in this election voting to select your upcoming executives.</p>

       <p ><b>Click the link or gif below to start voting:</b> </p>
       <a  href="${`https://vote.stigaoutwear.com/`}">start voting</a>
      </div>
      <div >
      <a style="width: 100%;" href="${`https://vote.stigaoutwear.com/`}">
      <img src="https://media.giphy.com/media/U5bGIPe6kxa2Q1XIPc/giphy.gif" width="100%" />
      </a>
      </div>
      `,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).json({
          errors: [
            {
              msg: "Could not send emails out",
            },
          ],
        });
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
