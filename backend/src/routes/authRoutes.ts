import { Router } from "express";
import { authenticateUser, login, passwordReset, requestPasswordReset } from "../controllers/authController";
import authHandler from "../middlewares/authHandler";

const authRouter = Router(); // Creates a routing instance

authRouter.post('/sign-in', login);

authRouter.post('/google-auth', authenticateUser);

authRouter.post('/request-password-reset', requestPasswordReset);

authRouter.put('/password-reset', authHandler, passwordReset);

export default authRouter;