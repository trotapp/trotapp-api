import { Router } from "express";
import { AuthenticationController } from "../auth/controller";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const controller = new AuthenticationController();


//route revalidation token
router.post('/revalidate-token', [AuthMiddleware.validateJWT] as any, controller.revalidateToken as any);

export default router;