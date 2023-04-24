import { Router } from "express";
import {
    createLink,
    getLink,
    getLinks,
    removeLink,
    updateLink,
} from "../controllers/linkController.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
    validationsLink,
    validationsLinkParams,
} from "../middlewares/validatorManager.js";

const router = Router();

router.get("/", requireToken, getLinks);
router.get("/:nanoLink", getLink);
router.post("/", requireToken, validationsLink, createLink);
router.delete("/:id", requireToken, validationsLinkParams, removeLink);
router.patch("/:id", requireToken, validationsLinkParams, validationsLink, updateLink);

export default router;
