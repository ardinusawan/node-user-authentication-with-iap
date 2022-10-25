const express = require('express')
const auth = require('./auth')
const path = require("path");
const router = express.Router();

const app = express()

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/login", (req, res) => {
  userEmail = req.headers['X-Goog-Authenticated-User-Email']
  userId = req.headers['X-Goog-Authenticated-User-ID']

  iapJwt = req.headers['X-Goog-IAP-JWT-Assertion']
  console.log(iapJwt)

  const ticket = auth.verify(iapJwt).catch(console.error);
  console.log(ticket)

  res.render("index", {
    email: userEmail,
    id: userId,
    verified_email: ticket.getAttributes().payload.email,
    verified_id: ticket.getUserId()}
  );
});

app.use("/", router);
app.listen(process.env.port || 8080);

console.log("Running at Port 8080");
