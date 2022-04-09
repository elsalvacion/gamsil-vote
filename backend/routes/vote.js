const connection = require("../config/db");
const { userProtect, adminProtect } = require("../middleware/protect");
const { body, validationResult } = require("express-validator");
const { sendVotes, sendStartVotes } = require("../utils/sendEmails");
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
      votes.forEach((vote, i) => {
        connection.query(
          `
        update candidate set votes = votes + 1 where id = ? and category = ?;
        update users set voted = 1 where id = ? ;  
        `,
          [vote.candidate, vote.category, req.user.id],
          (voteError, voteRes) => {
            if (voteError) {
              console.log(voteError);
              return res.status(400).json([
                {
                  msg: "Could not update votes",
                },
              ]);
            } else {
              if (i === votes.length - 1) {
                res.status(200).json({ msg: "Vote successful" });
              }
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
          return res.status(400).json({
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
            `select * from candidate where votes = (select max(votes) from candidate)`,
            (votesErr, votesRes) => {
              console.log(votesRes);
              if (votesErr) {
                console.log(votesErr);
                return res.status(400).json({
                  errors: [
                    {
                      msg: "Could not fetch votes",
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

// start/stop voting
router.put("/start-o-stop", userProtect, adminProtect, (req, res) => {
  try {
    const { isOpen } = req.body;

    connection.query(
      `
        update voting set isOpen = ?;
        `,
      [isOpen],
      (startVoteError, startVoteRes) => {
        if (startVoteError) {
          return res.status(400).json({
            errors: [
              {
                msg: "Could not start/stop vote",
              },
            ],
          });
        } else {
          if (isOpen === 1) {
            connection.query(
              `
            select * from users;
            `,
              (getUsersErr, getUsersRes) => {
                if (getUsersErr) {
                  return res.status(400).json({
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
                  sendStartVotes(users, res);
                }
              }
            );
          } else {
            res.json({ msg: "start/stop successful" });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "start/stop voting errors",
        },
      ],
    });
  }
});

// get start-o-stop
router.get("/start-o-stop", userProtect, (req, res) => {
  try {
    connection.query(
      `select * from voting;
        `,
      (startVoteError, startVoteRes) => {
        if (startVoteError) {
          return res.status(400).json({
            errors: [
              {
                msg: "Could not get start/stop vote",
              },
            ],
          });
        } else {
          res.json({ msg: startVoteRes[0].isOpen });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "start/stop fetch voting errors",
        },
      ],
    });
  }
});
module.exports = router;
