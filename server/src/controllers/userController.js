import { StatusCodes } from "http-status-codes";
import { userDB } from "../mock-data";
import ms from "ms";
import {
  generateToken,
  verifyToken,
  ACCESS_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_SECRET_SIGNATURE,
} from "../providers/JwtProvider";

class UserController {
  static async login(req, res) {
    try {
      if (
        req.body.email !== userDB.email ||
        req.body.password !== userDB.password
      ) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Your email or password is incorrect!" });
      }

      const user = {
        id: userDB.id,
        email: userDB.email,
      };

      const accessToken = await generateToken(
        user,
        ACCESS_TOKEN_SECRET_SIGNATURE,
        "5s"
      );

      const refreshToken = await generateToken(
        user,
        REFRESH_TOKEN_SECRET_SIGNATURE,
        "20 days"
      );

      // TH1 gan cookie cho client
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("14 days"),
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("14 days"),
      });

      // TH2 tra accessToken, freshToken cung voi thong tin user cho client
      return res
        .status(StatusCodes.OK)
        .json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  static async logout(req, res) {
    try {
      req.user = undefined;
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(StatusCodes.OK).json({ message: "Logout API success!" });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  static async refreshToken(req, res) {
    try {
      const refreshTokenFromClient= req.cookies?.refreshToken;
      if (!refreshTokenFromClient) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }

      const userDecoded = await verifyToken(
        refreshTokenFromClient,
        REFRESH_TOKEN_SECRET_SIGNATURE
      );
  
      if (userDecoded.id !== userDB.id) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }

      const user = {
        id: userDecoded.id,
        email: userDecoded.email
      }

      const accessToken = await generateToken(
        user,
        ACCESS_TOKEN_SECRET_SIGNATURE,
        "1h"
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("14 days"),
      });

      res
        .status(StatusCodes.OK)
        .json({ accessToken});
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default UserController;
