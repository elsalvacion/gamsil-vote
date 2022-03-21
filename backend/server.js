const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const category = require("./routes/category");
const user = require("./routes/user");
const candidate = require("./routes/candidate");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  morgan("dev");
}

app.use("/category", category);
app.use("/candidate", candidate);
app.use("/user", user);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`server running at ${PORT}`));
