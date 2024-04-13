const { Router } = require("express");
const { getAllSafetyCriteriaController, createSafetyCriteriaController, updateSafetyCriteriaController, deleteSafetyCriteriaController } = require("../controller/safetyCriteria.controller");
const router = Router();

router.get("/get-all-safetycriteria", getAllSafetyCriteriaController);
router.post("/create-safetycriteria/:id", createSafetyCriteriaController);
router.put("/update-safetycriteria/:id", updateSafetyCriteriaController);
router.delete("/delete-safetycriteria/:id", deleteSafetyCriteriaController);

module.exports = router;