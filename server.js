const express = require("express");
const mongoose = require("mongoose");
const mockUser = require("./Middleware/mockUser");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);     
app.use("/users", userRoutes);  
app.use("/records", recordRoutes);   
app.use("/dashboard", dashboardRoutes);
mongoose.connect("mongodb://localhost:27017/finance");

app.listen(5000, () => console.log("Server running"));
