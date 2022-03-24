const router = require("express").Router();
const connection = require("../config/db");
const { userProtect, adminProtect } = require("../middleware/protect");
const path = require("path");

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
            const fileName = fetchCandidateResult[0].name;

            if (!req.files) {
              res.status(400).json({
                errors: [{ msg: `Please upload a file` }],
              });
            }

            const file = req.files.file;

            // Create custom filename
            file.name = `${fileName}-${Date.now()}${path.parse(file.name).ext}`;

            file.mv(`public/images/${file.name}`, async (err) => {
              if (err) {
                console.log(err);
                return res.status(400).json({
                  errors: [{ msg: `File upload error` }],
                });
              }
              const image = `/public/images/${file.name}`;
              const updatedAt = Date.now().toString();
              const updatedBy = req.user.email;

              connection.query(
                `update  candidate set image = ?, updatedAt = ? , updatedBy = ? where id = ?`,
                [image, updatedAt, updatedBy, req.params.id],
                (updateCategoryErr, updateCategoryRes) => {
                  if (updateCategoryErr)
                    res.status(400).json({
                      errors: [
                        {
                          msg: "Database error contact admin",
                        },
                      ],
                    });
                  else res.status(200).json({ msg: image });
                }
              );
            });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          msg: "upload gone wrong",
        },
      ],
    });
  }
});

module.exports = router;
