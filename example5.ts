import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());

// Simulando una base de datos en memoria
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    ssn: "123-45-6789",
    creditCard: "4111 1111 1111 1111",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    ssn: "987-65-4321",
    creditCard: "4222 2222 2222 2222",
  },
];

app.get("/user/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
