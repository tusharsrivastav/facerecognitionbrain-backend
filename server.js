import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import knex from "knex";

// CONTROLLERS
import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import getProfile from "./controllers/profile.js";
import image from "./controllers/image.js";

// CONNECT TO POSTGRES DATABASE
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "smart-brain",
  },
});

const app = express();
// const PORT = 3001;

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

// API ENDPOINTS
app.get("/", (req, res) => { res.send("success") });
app.post("/signin", (req, res) => { signin(req, res, db, bcrypt) });
app.post("/register",  (req, res) => { register(req, res, db, bcrypt) });
app.get("/profile/:id", (req, res) => { getProfile(req, res, db) });
app.put("/image", (req, res) => { image(req, res, db) });

// STARTING THE SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
