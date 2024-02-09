import express from "express";
import controller from "../controllers/website";

const router = express.Router();

router.get("/websites", controller.getManyWebsites);
router.post("/websites", controller.createWebsite);
router.put("/websites", controller.updateWebsite);
router.delete("/websites/:websiteId", controller.removeWebsite);

export = router;
