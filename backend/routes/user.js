const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");
const jwt = require("jsonwebtoken");

// register user
router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid Email"),
  body("email").notEmpty().withMessage("Email is required"),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      connection.query(
        `insert into users(email, isAdmin, createdAt, updatedAt, updatedBy) values(?, ?, ?, ? , ?)`,
        [
          req.body.email,
          0,
          Date.now().toString(),
          Date.now().toString(),
          "steps",
        ],
        (emailInsertError, emailInsertResults) => {
          if (emailInsertError) {
            if (emailInsertError.code === "ER_DUP_ENTRY")
              res.status(400).json([
                {
                  msg: "User already exist",
                },
              ]);
            else
              res.status(400).json({
                errors: [
                  {
                    msg: "Database error contact coding team",
                  },
                ],
              });
          } else {
            res.status(200).json({ message: "User created" });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: [
          {
            msg: "Registration gone wrong",
          },
        ],
      });
    }
  }
);
// login user
router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid Email"),
  body("email").notEmpty().withMessage("Email is required"),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      connection.query(
        `select * from users where email = ?`,
        [req.body.email],
        (fetchUserError, fetchUserResult) => {
          if (fetchUserError) {
            res.status(400).json({
              errors: [
                {
                  msg: "Database error contact admin",
                },
              ],
            });
          } else {
            if (fetchUserResult.length === 0) {
              res.status(400).json({
                errors: [
                  {
                    msg: "Your are not registered, contact admin.",
                  },
                ],
              });
            } else
              res.status(200).json({
                msg: {
                  ...fetchUserResult[0],
                  token: jwt.sign(
                    {
                      id: fetchUserResult[0],
                    },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "30d",
                    }
                  ),
                },
              });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: [
          {
            msg: "Login gone wrong",
          },
        ],
      });
    }
  }
);

// get all users
router.get("/", (req, res) => {
  try {
    connection.query(
      `select * from users `,
      [],
      (fetchUserError, fetchUserResult) => {
        if (fetchUserError) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          res.status(200).json({ msg: fetchUserResult });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "fetch users gone wrong",
        },
      ],
    });
  }
});
// get user
router.get("/:id", (req, res) => {
  try {
    connection.query(
      `select * from users where id = ?`,
      [req.params.id],
      (fetchUserError, fetchUserResult) => {
        if (fetchUserError) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchUserResult.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "User not found",
                },
              ],
            });
          } else res.status(200).json({ msg: fetchUserResult[0] });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "fetch user gone wrong",
        },
      ],
    });
  }
});
// update user
router.put("/:id", (req, res) => {
  try {
    connection.query(
      `select * from users where id = ?`,
      [req.params.id],
      (fetchUserError, fetchUserResult) => {
        if (fetchUserError) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchUserResult.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "User not found",
                },
              ],
            });
          } else {
            const isAdmin = req.body.isAdmin || fetchUserResult[0].isAdmin;
            const email = req.body.email || fetchUserResult[0].email;
            const updatedAt = Date.now().toString();
            const updatedBy = "steps";

            connection.query(
              `update  users set isAdmin = ?, email = ?, updatedAt = ? , updatedBy = ? where id = ?`,
              [isAdmin, email, updatedAt, updatedBy, req.params.id],
              (updateUserError, updateUserResult) => {
                if (updateUserError)
                  res.status(400).json({
                    errors: [
                      {
                        msg: "Database error contact admin",
                      },
                    ],
                  });
                else res.status(200).json({ msg: "User updated" });
              }
            );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "update user gone wrong",
        },
      ],
    });
  }
});
// delete user
router.delete("/:id", (req, res) => {
  try {
    connection.query(
      `select * from users where id = ?`,
      [req.params.id],
      (fetchUserError, fetchUserResult) => {
        if (fetchUserError) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchUserResult.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "User not found",
                },
              ],
            });
          } else {
            connection.query(
              `delete from users where id = ?`,
              [req.params.id],
              (deleteUserError, deleteUserResult) => {
                if (deleteUserError)
                  res.status(400).json({
                    errors: [
                      {
                        msg: "Database error contact admin",
                      },
                    ],
                  });
                else res.status(200).json({ msg: "User deleted" });
              }
            );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "delete user gone wrong",
        },
      ],
    });
  }
});
module.exports = router;
