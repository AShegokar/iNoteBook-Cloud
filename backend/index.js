const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/login", (req, res) => {
  res.send("Hello login!");
});

app.get("/api/v1/signUp", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`);
});
