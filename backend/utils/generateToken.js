import jwt from "jsonwebtoken";
import { Config } from "../config/config.js";

export const generateToken = (id) => {
  return jwt.sign({ id }, Config.JWT_SECRET, {
  });
};
