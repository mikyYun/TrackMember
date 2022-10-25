import Jwt from "jsonwebtoken"
const generateToken = (email) => {
    /** GENERATE TOKEN FOR 1 DAY */
    const token = Jwt.sign({
      email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, email)
    return token;
}

const decodeToken = (value, email) => {
  const decoded = Jwt.verify(value, email, (err, val) => {
    if (err) console.error("Failed to decode token", err);
    console.log(val);
    return val;
  })
  console.log("DEC", decoded)
  return decoded
}

export {generateToken, decodeToken}