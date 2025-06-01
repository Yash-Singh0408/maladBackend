import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionsRoute from "./transactions_route.js";

dotenv.config();

const app = express();

// Secure CORS Configuration
const corsOptions = {
  origin: "https://murbad.vercel.app", // change to your frontend URL
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/transactions", transactionsRoute);

// MongoDB + Server Init
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
