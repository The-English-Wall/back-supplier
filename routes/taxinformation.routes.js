const { Router } = require("express");
const router = Router();
const {
  getTaxInformationController,
  createTaxInformationController,
  updateTaxInformationController,
  deleteTaxInformationController,
} = require("../controller/taxinformation.controller");

router.get("/get-all-taxinformation", getTaxInformationController);
router.delete("/delete-taxinformation/:id", deleteTaxInformationController);
router.put("/update-taxinformation/:id", updateTaxInformationController);
router.post("/create-taxinformation/:id", createTaxInformationController);

module.exports = router;
