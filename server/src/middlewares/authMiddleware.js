import { StatusCodes } from "http-status-codes";
import { userDB } from "~/mock-data";
import {
  verifyToken,
  ACCESS_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_SECRET_SIGNATURE,
} from "~/providers/JwtProvider";

const authorizedMiddleware = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const userDecoded = await verifyToken(
      accessToken,
      ACCESS_TOKEN_SECRET_SIGNATURE
    );

    if (userDecoded.id !== userDB.id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    req.user = userDecoded;
    next();
  } catch (error) {
    if (error.message?.includes("jwt expired")) {
      return res.status(StatusCodes.GONE).json({ message: "Token expired" });
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
};

export default authorizedMiddleware;
