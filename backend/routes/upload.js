const router = require("express").Router();
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 10);
const { userProtect, adminProtect } = require("../middleware/protect");
const path = require("path");

router.post("/", userProtect, adminProtect, (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({
        errors: [{ msg: `Please upload a file` }],
      });
    }

    const file = req.files.file;

    // Create custom filename
    file.name = `candidate-${nanoid(3)}${path.parse(file.name).ext}`;

    file.mv(`public/images/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          errors: [{ msg: `File upload error` }],
        });
      }
      const image = `images/${file.name}`;
      res.json({ msg: image });
    });
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
