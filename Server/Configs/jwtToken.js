const jwt = require("jsonwebtoken");
const AsynceHandler = require("express-async-handler");

const generateToken = AsynceHandler(async (_id) => {
  return await jwt.sign({ _id }, "m:/i0$8`!bE>6A*e+E/Qr,&KOhm!", { expiresIn: "1d" });
});

const generateRefreshToken = AsynceHandler(async (_id) => {
  return await jwt.sign({ _id }, "m:/i0$8`!bE>6A*e+E/Qr,&KOhm!", {
    expiresIn: "3d",
  });
});

module.exports = { generateToken, generateRefreshToken };
