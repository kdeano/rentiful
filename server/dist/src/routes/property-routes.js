"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_controllers_1 = require("../controllers/property-controllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
router.get("/", property_controllers_1.getProperties);
router.get("/:id", property_controllers_1.getProperty);
router.post("/", (0, authMiddleware_1.AuthMiddleware)(["manager"]), upload.array("photos"), property_controllers_1.createProperty);
exports.default = router;
