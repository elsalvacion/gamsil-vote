const router = require("express").Router();
const { body, validationResult } = require("express-validator");
// create category
router.post("/", (req, res) => {});
// get all category
router.get("/", (req, res) => {});
// get category
router.get("/:id", (req, res) => {});
// update category
router.put("/:id", (req, res) => {});
// delete category
router.delete("/:id", (req, res) => {});
module.exports = router;
