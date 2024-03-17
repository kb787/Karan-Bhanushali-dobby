const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv");
const Connection = require("./configure");
const { registerRouter, loginRouter } = require("./authentication-controller");
const uploadingRouter = require("./image-uploading-controller");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(express.json());
app.use(cors(corsOptions));
dotenv.config();
Connection();

const port_no = process.env.port_no;
const base_endpoint = process.env.base_api;

app.get("/", (req, res) => {
  return res.send("App running successfully");
});

app.use(base_endpoint, registerRouter);
app.use(base_endpoint, loginRouter);
app.use(base_endpoint, uploadingRouter);

server.listen(port_no, () => {
  console.log(`App launched successfully on port no ${port_no}`);
});
