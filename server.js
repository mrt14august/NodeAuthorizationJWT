const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());

const posts = [
  {
    username: "james",
    title: "post1",
  },
  {
    username: "kyle",
    title: "post2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  //consider authentication is handled already and lets just focus on authorization part with jwt

  const username = req.body.username;
  const user = { name: username };

  //create jsonwebtoken
  //fn takes payload (middle data to be serialized),  and serial key
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log("accessTocken = ", accessToken); //optional
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  //<Bearer Token>

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // to get the whole token after bearer word (authorization : Bearer <whole token>)
  console.log("TOKEN : ", token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .send(
          "I see you have token, but the token is not valid, so you do not have access"
        )
        .sendStatus(403);
      console.log(
        "I see you have token, but the token is not valid, so you do not have access"
      );
    }
    //name not found in array
    if (posts.filter((ele) => ele.username === req.body.username) == 0)
      return res.send(
        "The name you have been logged into is not available in DB"
      );

    //everythings good
    req.user = user; //giving only the logged in user's name
    next();
  });
}

app.listen(3000, () => {
  console.log("PORT IS RUNNING ON 3000");
});
