const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
    type: String,
    enum: ["viewer", "analyst", "admin"],
    default: "viewer",  
    },
    status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    },
});
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);