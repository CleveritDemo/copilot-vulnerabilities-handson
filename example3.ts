import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/change-password", (req, res) => {
  const { username, newPassword } = req.body;
  // Supongamos que aquí se actualiza la contraseña en la base de datos
  console.log(`Changing password for user ${username} to ${newPassword}`);
  res.send("Password changed successfully!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
