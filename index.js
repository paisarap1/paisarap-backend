const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();
dotenv.config();

app.use(cors({
  origin: "https://paisarap-frontend.onrender.com", // ✅ Frontend Render URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// All Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Paisarap backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
