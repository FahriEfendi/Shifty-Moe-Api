import express from "express";
import {Login, logOut, Me} from "../controllers/Auth.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login,verifyUser);
router.delete('/logout', logOut);

export default router;