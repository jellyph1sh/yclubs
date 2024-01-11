const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
  const token = req.data["token"];
  if (!token) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  res.json({ userId: decodedToken.userId, email: decodedToken.email });
};

exports.createToken = (userId, email) => {
  return jwt.sign(
    {
      userId: userId,
      email: email,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "6 hours" }
  );
};
