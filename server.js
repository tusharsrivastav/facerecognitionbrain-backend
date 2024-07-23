import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import knex from "knex";
import * as dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

// CONTROLLERS
import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import getProfile from "./controllers/profile.js";
import image from "./controllers/image.js";

// CONNECT TO POSTGRES DATABASE
// const db = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     user: "postgres",
//     password: "",
//     database: "smart-brain",
//   },
// });

// PRODUCTION CODE
const db = knex({
  client: "pg",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

// API ENDPOINTS
app.get("/", (req, res) => {
  res.send("success");
});
app.post("/signin", (req, res) => {
  signin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  getProfile(req, res, db);
});
app.put("/image", (req, res) => {
  image(req, res, db);
});

// STARTING THE SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
