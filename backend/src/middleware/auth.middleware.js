import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    console.log("ii");
    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
    console.log("i");
    if (!user) {
      return res(404).json({ message: "User not found" });
    }
    console.log("hi");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user ", error);

    return res.status(500).json({ message: "Error authenticating user" });
  }
};

export const checkAdmin = async function (req, res, next) {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user || !user.role == "ADMIN") {
      return res.status(403).json({
        message: "Access denied - Admins only",
      });
    }

    next();
  } catch (error) {}
  console.log("Error checking admin role:", error);
  return res.status(500).json({
    message: "Error checking admin role",
  });
};
