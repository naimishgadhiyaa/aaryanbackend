import express from "express";
import {
  createNew,
  updateWingUnits,
  getWings,
} from "../controllers/wings.controller.js";

const router = express.Router();

router.post("/createnew", createNew);
router.get("/getwings", getWings);
router.put("/update-wing-units", updateWingUnits);

export default router;
