import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import imageRouter from "./routes/imagesRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { clerkWebhooks } from "./controllers/UserController.js";

const app = express();
await connectDB();

// Clerk webhook MUST come BEFORE express.json
app.post(
  "/api/user/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Normal middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.listen(4000, () => console.log("Server running"));
