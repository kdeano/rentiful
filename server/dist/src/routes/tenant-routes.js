"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tenant_controllers_1 = require("../controllers/tenant-controllers");
const router = express_1.default.Router();
router.get("/:cognitoId", tenant_controllers_1.getTenant);
router.put("/:cognitoId", tenant_controllers_1.updateTenant);
router.get("/:cognitoId/current-residences", tenant_controllers_1.getCurrentResidences);
router.post("/", tenant_controllers_1.createTenant);
exports.default = router;
