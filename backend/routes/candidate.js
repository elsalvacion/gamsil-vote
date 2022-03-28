const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");
const { userProtect, adminProtect } = require("../middleware/protect");

// create candidate
router.post(
  "/",
  userProtect,
  adminProtect,
  body("name").notEmpty().withMessage("Name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("image").notEmpty().withMessage("Image is required"),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      connection.query(
        `insert into candidate(name, category, image, createdAt, updatedAt, updatedBy) values (?,?,?,?,?,?)`,
        [
          req.body.name,
          req.body.category,
          req.body.image,
          Date.now().toString(),
          Date.now().toString(),
          req.user.email,
        ],
        (insertCandidateErr, insertCandidateRes) => {
          if (insertCandidateErr) {
            if (insertCandidateErr.code === "ER_DUP_ENTRY")
              res.status(400).json({
                errors: [
                  {
                    msg: "Candidate already exist",
                  },
                ],
              });
            else
              res.status(400).json({
                errors: [
                  {
                    msg: "Database error contact coding team",
                  },
                ],
              });
          } else {
            res.status(200).json({ msg: "candidate created" });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: [
          {
            msg: "create candidate gone wrong",
          },
        ],
      });
    }
  }
);

// get all candidate
router.get("/", userProtect, adminProtect, (req, res) => {
  try {
    const query = req.query.category ? ` where category = ? ` : "";
    connection.query(
      `select * from candidate ${query} order by id desc`,
      [req.query.category ? req.query.category : null],
      (fetchCandidateErr, fetchCandidateRes) => {
        if (fetchCandidateErr) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          res.status(200).json({ msg: fetchCandidateRes });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "fetch candidate gone wrong",
        },
      ],
    });
  }
});
// get candidate
router.get("/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from candidate where id = ?`,
      [req.params.id],
      (fetchCandidateErr, fetchCandidateRes) => {
        if (fetchCandidateErr) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchCandidateRes.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "Candidate not found",
                },
              ],
            });
          } else res.status(200).json({ msg: fetchCandidateRes[0] });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "fetch candidate gone wrong",
        },
      ],
    });
  }
});
// update candidate
router.put("/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from candidate where id = ?`,
      [req.params.id],
      (fetchCandidateError, fetchCandidateResult) => {
        if (fetchCandidateError) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchCandidateResult.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "Candidate not found",
                },
              ],
            });
          } else {
            const name = req.body.name;
            const image = req.body.image;
            const category = req.body.category;
            const updatedAt = Date.now().toString();
            const updatedBy = req.user.email;

            connection.query(
              `update  candidate set name = ?, image = ?, category = ?, updatedAt = ? , updatedBy = ? where id = ?`,
              [name, image, category, updatedAt, updatedBy, req.params.id],
              (updateCategoryErr, updateCategoryRes) => {
                if (updateCategoryErr)
                  res.status(400).json({
                    errors: [
                      {
                        msg: "Database error contact admin",
                      },
                    ],
                  });
                else res.status(200).json({ msg: "Candidate updated" });
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
          msg: "update category gone wrong",
        },
      ],
    });
  }
});
// delete candidate
router.delete("/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from candidate where id = ?`,
      [req.params.id],
      (fetchCandidateErr, fetchCandidateRes) => {
        if (fetchCandidateErr) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchCandidateRes.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "Candidate not found",
                },
              ],
            });
          } else {
            connection.query(
              `delete from candidate where id = ?`,
              [req.params.id],
              (deleteCandidateErr, deleteCandidateRes) => {
                if (deleteCandidateErr)
                  res.status(400).json({
                    errors: [
                      {
                        msg: "Database error contact admin",
                      },
                    ],
                  });
                else res.status(200).json({ msg: "Candidate deleted" });
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
          msg: "delete candidate gone wrong",
        },
      ],
    });
  }
});
module.exports = router;
