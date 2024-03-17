const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv");
const Connection = require("./configure");
dotenv.config();
Connection();

const port_no = process.env.port_no;

app.get("/", (req, res) => {
  return res.send("App running successfully");
});

server.listen(port_no, () => {
  console.log(`App launched successfully on port no ${port_no}`);
});
