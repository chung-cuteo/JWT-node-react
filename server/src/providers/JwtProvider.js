import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET_SIGNATURE = "KBgJwUETt4HeVD05WaXXI9V3JnwCVP";
const REFRESH_TOKEN_SECRET_SIGNATURE = "fcCjhnpeopVn2Hg1jG75MUi62051yL";

const generateToken = async (payload, secretSignature, expires) => {
  try {
    return jwt.sign(payload, secretSignature, {
      expiresIn: expires,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (token, secretSignature) => {
  try {
    return jwt.verify(token, secretSignature);
  } catch (error) {
    throw new Error(error);
  }
};

export {
  ACCESS_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_SECRET_SIGNATURE,
  generateToken,
  verifyToken,
};
