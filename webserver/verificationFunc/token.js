const jwt = require("jsonwebtoken");

const SECRET_TOKEN = "clubs ynov secret token oiubfeiojebijzo";

exports.verifyToken = (req) => {
  const token = req.data["token"];
  if (!token) {
    return false;
  }
  const decodedToken = jwt.verify(token, SECRET_TOKEN);
  return { userId: decodedToken.userId, email: decodedToken.email };
};

exports.createToken = (userId, email) => {
  return jwt.sign(
    {
      userId: userId,
      email: email,
    },
    SECRET_TOKEN,
    { expiresIn: "1h" }
  );
};
