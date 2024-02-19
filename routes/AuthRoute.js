import express from "express";
import {Login, Logout} from "../controllers/Auth.js";
import { verifyUser, adminOnly,Token } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', Token);


export default router;