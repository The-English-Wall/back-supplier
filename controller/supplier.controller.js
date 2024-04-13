const { PATH_CONTROLLER, ERROR_MESSAGE } = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliersByQuery,
} = require("../services/supplier.service");

const getAllSupplierController = async (req, res) => {
  try {
    const supplierResponse = await getAllSuppliers();
    res.status(200).json(supplierResponse);
  } catch (error) {
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

const getSupplierByQueryController = async (req, res) => {
  try {
    const supplierResponse = await getSuppliersByQuery(req.query);
    res.status(200).json(supplierResponse);
  } catch (error) {
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

const createSupplierController = async (req, res) => {
  try {
    const supplierResponse = await createSupplier(req.body);
    res.status(200).json(supplierResponse);
  } catch (error) {
    console.log("error", error);
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, ERROR_MESSAGE));
  }
};

const updatedSupplierController = async (req, res) => {
  try {
    const supplierResponse = await updateSupplier(req.body, req.params.id);
    res.status(200).json(supplierResponse);
  } catch (error) {
    console.log("error", error);
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, ERROR_MESSAGE));
  }
};

const deleteSupplierController = async (req, res) => {
  try {
    const supplierResponse = await deleteSupplier(req.params.id);
    res.status(200).json(supplierResponse);
  } catch (error) {
    console.log("error", error);
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, ERROR_MESSAGE));
  }
};

module.exports = {
  getAllSupplierController,
  createSupplierController,
  updatedSupplierController,
  deleteSupplierController,
  getSupplierByQueryController,
};
