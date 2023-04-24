import { Router } from "express";
import { redirectLink } from "../controllers/redirectController.js";

const router = Router();

router.get("/:nanoLink", redirectLink);

export default router;
