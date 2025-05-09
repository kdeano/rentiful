import express from "express";
import {
    getTenant,
    createTenant,
    updateTenant,
    getCurrentResidences,
} from "../controllers/tenant-controllers";

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", updateTenant);
router.get("/:cognitoId/current-residences", getCurrentResidences);
router.post("/", createTenant);

export default router;
