import express from "express";
import {
    getProperties,
    getProperty,
    createProperty,
} from "../controllers/property-controllers";
import { AuthMiddleware } from "../middleware/authMiddleware";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
    "/",
    AuthMiddleware(["manager"]),
    upload.array("photos"),
    createProperty
);

export default router;
