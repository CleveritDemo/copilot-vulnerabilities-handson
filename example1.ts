import { createConnection } from "typeorm";

async function getUserByEmail(email: string) {
  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "mydatabase",
  });

  const query = `SELECT * FROM users WHERE email = '${email}'`;

  const result = await connection.query(query);

  return result;
}

getUserByEmail("example@example.com")
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
