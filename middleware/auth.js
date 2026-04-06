const jwt = require("jsonwebtoken");

module.exports = (allowedRoles) => {
  return (req, res, next) => {
    const rawToken =
      req.header("Authorization") ||
      req.header("authorization") ||
      req.header("x-access-token") ||
      req.body?.token ||
      req.query?.token;

    if (!rawToken || typeof rawToken !== "string") {
      return res.status(401).json({ msg: "No token" });
    }

    const token = rawToken.startsWith("Bearer ")
      ? rawToken.slice(7).trim()
      : rawToken.trim();

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    try {
      const decoded = jwt.verify(token, "secretkey");

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
};
