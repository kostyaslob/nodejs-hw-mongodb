import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
    registerUserSchema,
    loginUserSchema,
    sendResetEmailSchema
} from "../validation/auth.js";
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    sendResetEmailController
} from "../controllers/auth.js";


const router = Router();

router.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post("/logout", ctrlWrapper(logoutUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post("/send-reset-email", validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController));

export default router;