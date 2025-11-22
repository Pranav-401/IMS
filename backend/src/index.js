import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Import needed for the '/' route check
import userRoutes from "./routes/userRouter.js";
import errorHandling from "./middleware/errorhandler.js";
import createUserRoleTable from "./data/createUserTable.js"; // <-- FIX: Correct import name

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api", userRoutes);

// Error handling middleware (must be last)
app.use(errorHandling);

// Create user table before starting the app if not found
createUserRoleTable(); // <-- FIX: Correct function call

// Testing postgres connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is ${result.rows[0].current_database}`);
  } catch (error) {
    res.status(500).send(`Error connecting to database: ${error.message}`);
  }
});

// Server listener
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
