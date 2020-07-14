require("../config/db");
const express = require("express");
const User = require("../models/User");

//Iniciando servidor rest
const app = express();
app.use(express.json());

//Escrevendo rotas
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    console.error(e);
    return res.status(400);
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(400);
  }
});

app.post("/users", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    await User.create({
      firstName,
      lastName,
      email,
    });
    return res.json({ message: "User created!" });
  } catch (e) {
    console.error(e);
    return res.status(400);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: `User ${req.params.id} was deleted` });
  } catch (e) {
    console.error(e);
    return res.status(400);
  }
});

app.patch("/users/:id", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
    });
    return res.json({ message: `User ${id} was updated` });
  } catch (e) {
    console.error(e);
    return res.status(400);
  }
});

app.listen(3000, () =>
  console.log("Rest server is running in http://localhost:3000")
);
