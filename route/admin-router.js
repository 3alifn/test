import express from "express";
import { admin_func } from "../setting/admin-app.js";
export const admin_router = express.Router();

admin_router.all('/', admin_func )
