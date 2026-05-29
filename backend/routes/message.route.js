import express from "express"
import { getUsersForSidebar } from "../controllers/message.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
import { getMessages } from "../controllers/message.controller.js";
import { sendMessages } from "../controllers/message.controller.js";


//create a router
const router = express.Router();

//routes
router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessages)



export default router;