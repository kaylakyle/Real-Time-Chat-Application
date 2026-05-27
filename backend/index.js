import express from "express"
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";

//initialize dotenv
dotenv.config();

//start app
const app = express();

// allows extraction of json data
app.use(express.json());
// allow to parse the cookie
app.use(cookieParser());

//routes for login,signup,logout
app.use("/api/auth", authRoutes)

//connect db
connectDB();


// start server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
