import express from "express";
import {
    getUsers,
    getUserById,
    Register,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', adminOnly, getUsers);
router.get('/users/:id', adminOnly, getUserById);
router.post('/users', adminOnly ,Register);
router.patch('/users/:id',  adminOnly, updateUser);
router.delete('/users/:id',  adminOnly, deleteUser);

export default router;