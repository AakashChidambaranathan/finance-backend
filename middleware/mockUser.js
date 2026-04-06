const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const rawToken =
    req.header("Authorization") ||
    req.header("authorization") ||
    req.header("x-access-token") ||
    req.body?.token ||
    req.query?.token;

  if (!rawToken || typeof rawToken !== "string") {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  const token = rawToken.startsWith("Bearer ")
    ? rawToken.slice(7).trim()
    : rawToken.trim();

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // contains id + role
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
