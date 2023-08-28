const express = require("express");
const bodyParser = require("body-parser");
const sqlInjectionDetector = require("./index");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(sqlInjectionDetector);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
// Test GET endpoint
app.get("/test", (req, res) => {
  const param = req.query.param;
  res.send(`Received parameter: ${param}`);
});

// Test POST endpoint
app.post("/test", (req, res) => {
  const param = req.body.param;
  res.send(`Received parameter: ${param}`);
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
