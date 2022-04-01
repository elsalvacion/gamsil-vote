const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const path = require("path");
const category = require("./routes/category");
const user = require("./routes/user");
const candidate = require("./routes/candidate");
const upload = require("./routes/upload");
const vote = require("./routes/vote");

const app = express();
app.use(fileupload());
app.use(express.json());

// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("/verify"));

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.use("/category", category);
app.use("/candidate", candidate);
app.use("/user", user);
app.use("/upload", upload);
app.use("/vote", vote);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`server running at ${PORT}`));
