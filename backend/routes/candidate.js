const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { userProtect, adminProtect } = require("../middleware/protect");

// create candidate
router.post("/", userProtect, adminProtect, (req, res) => {});
// get all candidate
router.get("/", userProtect, adminProtect, (req, res) => {});
// get candidate
router.get("/:id", userProtect, adminProtect, (req, res) => {});
// update candidate
router.put("/:id", userProtect, adminProtect, (req, res) => {});
// delete candidate
router.delete("/:id", userProtect, adminProtect, (req, res) => {});
module.exports = router;
