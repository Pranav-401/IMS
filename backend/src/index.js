import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import errorHandling from "./middleware/errorhandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Assuming backend runs on 3000

// middleware
app.use(express.json());
// Allowing requests from frontend, assuming it runs on port 5173 (Vite default) or 3001
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// route
app.use("/api", userRoutes);

// error handling
app.use(errorHandling);

// create user table before starting the app if not found
createUserTable();

// testing postgres connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is ${result.rows[0].current_database}`);
  } catch (error) {
    res.status(500).send(`Error connecting to database: ${error.message}`);
  }
});

// server
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
