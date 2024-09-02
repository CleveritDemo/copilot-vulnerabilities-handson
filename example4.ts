import bodyParser from "body-parser";
import express from "express";
import session from "express-session";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: true })
);

// Dummy user data

const users = [
  { id: 1, username: "user1", password: "password1" },

  { id: 2, username: "user2", password: "password2" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    req.session.userId = user.id;

    res.send("Login successful!");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.get("/profile", (req, res) => {
  if (req.session && req.session.userId) {
    const user = users.find((u) => u.id === req.session.userId);

    if (user) {
      res.send(`Welcome, ${user.username}!`);
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
