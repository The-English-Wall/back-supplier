const { Router } = require("express");
const { getComercialCriteriaController, createComercialCriteriaController, updateComercialCriteriaController, deleteComercialCriteriaController } = require("../controller/comercialCriteria.controller");
const router = Router();

router.get("/get-all-comercialcriteria", getComercialCriteriaController);
router.post("/create-comercialcriteria/:id", createComercialCriteriaController);
router.put("/update-comercialcriteria/:id", updateComercialCriteriaController);
router.delete("/delete-comercialcriteria/:id", deleteComercialCriteriaController);

module.exports = router;