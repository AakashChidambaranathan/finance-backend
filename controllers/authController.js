const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

 exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
        expiresIn: "1h",
    });

    res.json({ token });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};
