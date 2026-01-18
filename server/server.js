import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import useRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imagesRoutes.js";
import { clerkWebhooks } from "./controllers/UserController.js";

// App Config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// Clerk webhook MUST use raw body
app.post(
  "/api/user/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Normal middleware AFTER webhook
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", useRouter);
app.use("/api/image", imageRouter);


app.listen(PORT, () => console.log("Server running on port: ", PORT));
