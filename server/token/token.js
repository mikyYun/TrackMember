import Jwt from "jsonwebtoken";
const expiration = 60 * 60 * 48;
const generateToken = (email) => {
  /** GENERATE TOKEN FOR 1 DAY */
  const token = Jwt.sign({
    email,
    exp: Math.floor(Date.now() / 1000) + expiration
  }, email);
  return token;
};

const decodeToken = (value, email) => {
  return Jwt.verify(value, email, (err, val) => {
    if (err) console.error("Failed to decode token", err);
    return val;
  });

};

const isExpired = (exp) => {
  return Math.floor(Date.now() / 1000) - exp > expiration;
};

export { generateToken, decodeToken, isExpired };