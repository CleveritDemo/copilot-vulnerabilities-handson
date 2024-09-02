const express = require("express");
const app = express();
const users = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "user", password: "abcd", role: "user" },
];

app.use((req, res, next) => {
  const { username } = req.query;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send("No autenticado");
  }
  req.user = user;
  next();
});

app.get("/user-info", (req, res) => {
  res.send(req.user);
});

app.post("/update-user", (req, res) => {
  const { username, newPassword } = req.query;
  const user = users.find((u) => u.username === username);
  if (user) {
    user.password = newPassword;
    res.send("Contraseña actualizada");
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

app.post("/admin-action", (req, res) => {
  if (req.user.role === "admin") {
    res.send("Acción administrativa realizada");
  } else {
    res.status(403).send("No autorizado");
  }
});

app.delete("/delete-record", (req, res) => {
  res.send("Registro eliminado");
});

app.get("/dos", (req, res) => {
  while (true) {}
});

app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
