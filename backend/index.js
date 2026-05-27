import express from "express"
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";

//start app
const app = express();

//routes for login,signup,logout
app.use("/api/auth", authRoutes)

// start server
const PORT = process.env.PORT || 5000;

// allows extraction of json data
app.use(express.json());
// allow to parse the cookie
app.use(cookieParser());

//connect db
connectDB();

dotenv.config();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
