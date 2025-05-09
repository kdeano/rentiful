"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manager_controllers_1 = require("../controllers/manager-controllers");
const router = express_1.default.Router();
router.get("/:cognitoId", manager_controllers_1.getManager);
router.put("/:cognitoId", manager_controllers_1.updateManager);
router.get("/:cognitoId/properties", manager_controllers_1.getManagerProperties);
router.post("/", manager_controllers_1.createManager);
exports.default = router;
