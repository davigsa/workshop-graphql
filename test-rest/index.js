const express = require("express");

const db = [
  { id: 0, name: "andre", email: "andre@test.com" },
  { id: 1, name: "dudu", email: "dudu@test.com" },
  { id: 2, name: "davi", email: "davi@test.com" },
];

const app = express();

app.get("/users", (req, res) => {
  return res.json(db);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: db.length,
    name: req.body.name,
    email: req.body.email,
  };
  return db.push(newUser);
});

app.listen(3000, () => console.log("Express server is running!"));
