const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");
const { userProtect, adminProtect } = require("../middleware/protect");
// create category
router.post(
  "/",
  userProtect,
  adminProtect,
  body("title").notEmpty().withMessage("Title is required"),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      connection.query(
        `insert into category(title, createdAt, updatedAt, updatedBy) values (?,?,?,?)`,
        [
          req.body.title,
          Date.now().toString(),
          Date.now().toString(),
          req.user.email,
        ],
        (insertCategoryErr, insertCategoryRes) => {
          if (insertCategoryErr) {
            if (insertCategoryErr.code === "ER_DUP_ENTRY")
              res.status(400).json([
                {
                  msg: "Category already exist",
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
            res.status(200).json({ msg: "category created" });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: [
          {
            msg: "create category gone wrong",
          },
        ],
      });
    }
  }
);
// get all category
router.get("/", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from category order by id desc`,
      (fetchCategoryErr, fetchCategoryRes) => {
        if (fetchCategoryErr) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          res.status(200).json({ msg: fetchCategoryRes });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "fetch category gone wrong",
        },
      ],
    });
  }
});
// get category
router.get("/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from category where id = ?`,
      [req.params.id],
      (fetchCategoryErr, fetchCategoryRes) => {
        if (fetchCategoryErr) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchCategoryRes.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "Category not found",
                },
              ],
            });
          } else res.status(200).json({ msg: fetchCategoryRes[0] });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "fetch category gone wrong",
        },
      ],
    });
  }
});
// update category
router.put("/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from category where id = ?`,
      [req.params.id],
      (fetchCategoryError, fetchCategoryResult) => {
        if (fetchCategoryError) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchCategoryResult.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "Category not found",
                },
              ],
            });
          } else {
            const title = req.body.title;
            const updatedAt = Date.now().toString();
            const updatedBy = req.user.email;

            connection.query(
              `update  category set title = ?,  updatedAt = ? , updatedBy = ? where id = ?`,
              [title, updatedAt, updatedBy, req.params.id],
              (updateCategoryErr, updateCategoryRes) => {
                if (updateCategoryErr)
                  res.status(400).json({
                    errors: [
                      {
                        msg: "Database error contact admin",
                      },
                    ],
                  });
                else res.status(200).json({ msg: "Category updated" });
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
// delete category
router.delete("/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from category where id = ?`,
      [req.params.id],
      (fetchCategoryErr, fetchCategoryRes) => {
        if (fetchCategoryErr) {
          res.status(400).json({
            errors: [
              {
                msg: "Database error contact admin",
              },
            ],
          });
        } else {
          if (fetchCategoryRes.length === 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "Category not found",
                },
              ],
            });
          } else {
            connection.query(
              `delete from category where id = ?`,
              [req.params.id],
              (deleteCategoryErr, deleteCategoryRes) => {
                if (deleteCategoryErr)
                  res.status(400).json({
                    errors: [
                      {
                        msg: "Database error contact admin",
                      },
                    ],
                  });
                else res.status(200).json({ msg: "Category deleted" });
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
          msg: "delete category gone wrong",
        },
      ],
    });
  }
});
module.exports = router;
