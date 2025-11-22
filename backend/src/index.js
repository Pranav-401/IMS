import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import errorHandling from "./middleware/errorhandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

//route
app.use("/api", userRoutes);

//error handling
app.use(errorHandling);

//create user table before starting the app if not found
createUserTable();

//testing postgres connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is ${result.rows[0].current_database}`);
});

//server
app.listen(port, () => {
  console.log(`sever is running in port ${port}`);
});
