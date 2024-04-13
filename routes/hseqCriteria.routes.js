const { Router } = require("express");
const { getAllHseqCriteriaController, createHseqCriteriaController, updateHseqCriteriaController, deleteHseqCriteriaController } = require("../controller/hseqCriteria.controller");
const router = Router();

router.get("/get-all-hseqcriteria", getAllHseqCriteriaController);
router.post("/create-hseqcriteria/:id", createHseqCriteriaController);
router.put("/update-hseqcriteria/:id", updateHseqCriteriaController);
router.delete("/delete-hseqcriteria/:id", deleteHseqCriteriaController);

module.exports = router;