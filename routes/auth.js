import { Router } from "express";
import {
    infoUser,
    login,
    register,
    refreshToken,
    logout,
} from "../controllers/authController.js";
import {
    validationsRegister,
    validationsLogin,
} from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";



const router = Router();

router.post("/login", validationsLogin, login);
router.post("/register", validationsRegister, register);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;
