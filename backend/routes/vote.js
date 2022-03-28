const connection = require("../config/db");
const { userProtect, adminProtect } = require("../middleware/protect");
const { body, validationResult } = require("express-validator");
const { sendVotes } = require("../utils/sendEmails");
const router = require("express").Router();

// vote

router.post(
  "/",
  userProtect,
  body("votes").notEmpty().withMessage("Votes are required"),
  (req, res) => {
    try {
      const { votes } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      votes.forEach((vote) => {
        connection.query(
          `
        update candidate set votes = votes + 1 where id = ?;
        update users set voted = 1 where id = ? ;  
        `,
          [vote.candidate, req.user.id],
          (voteError, voteRes) => {
            if (voteError) {
              res.status(400).json([
                {
                  msg: "Could not update votes",
                },
              ]);
            } else {
              res.json({ msg: "Vote successful" });
            }
          }
        );
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: [
          {
            msg: "voting errors",
          },
        ],
      });
    }
  }
);

// release votes
router.get("/release", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `
    select * from users;
    `,
      (getUsersErr, getUsersRes) => {
        if (getUsersErr) {
          res.status(400).json({
            errors: [
              {
                msg: "Could not get voters",
              },
            ],
          });
        } else {
          const users = [];
          getUsersRes.forEach((user) => {
            users.push(user.email);
          });

          connection.query(
            `select name, category, image from candidate where votes = (select max(votes) from candidate )`,
            (votesErr, votesRes) => {
              if (votesErr) {
                console.log(votesErr);
                res.status(400).json({
                  errors: [
                    {
                      msg: "Could not get votes",
                    },
                  ],
                });
              } else {
                sendVotes(users, votesRes, res);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "release votes error",
        },
      ],
    });
  }
});

module.exports = router;
