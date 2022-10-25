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
  console.log("headers: ", req.headers)
  userEmail = req.headers['x-goog-authenticated-user-email']
  userId = req.headers['x-goog-authenticated-user-id']

  iapJwt = req.headers['x-goog-iap-jwt-assertion']
  if (typeof iapJwt === 'undefined') {
    res.send("empty x-goog-iap-jwt-assertion");
  }
  console.log(iapJwt)

  auth.verify(iapJwt)
    .then(
      function(data) {
        res.render("index", {
          email: userEmail,
          id: userId,
          verified_email: data.payload.email,
          verified_id: data.payload.sub}
        )})
    .catch(console.error);
});

app.use("/", router);
app.listen(process.env.port || 8080);

console.log("Running at Port 8080");
