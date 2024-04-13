const { Router } = require("express");
const router = Router();
const {
  getAllSupplierController,
  createSupplierController,
  updatedSupplierController,
  deleteSupplierController,
  getSupplierByQueryController,
} = require("../controller/supplier.controller");

router.get("/get-all-supplier", getAllSupplierController);
router.get("/get-supplier-query", getSupplierByQueryController);
router.post("/create-supplier", createSupplierController);
router.put("/update-supplier/:id", updatedSupplierController);
router.delete("/delete-supplier/:id", deleteSupplierController);

module.exports = router;
