const { PATH_CONTROLLER, ERROR_MESSAGE } = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const {
  getTaxInformation,
  createTaxInformation,
  updateTaxinformation,
  deleteTaxInformation,
} = require("../services/taxinformation.service");

const getTaxInformationController = async (req, res) => {
  try {
    const taxResponse = await getTaxInformation();
    res.status(200).json(taxResponse);
  } catch (error) {
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

const createTaxInformationController = async (req, res) => {
  try {
    const taxResponse = await createTaxInformation(req.params.id, req.body);
    res.status(200).json(taxResponse);
  } catch (error) {
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const updateTaxInformationController = async (req, res) => {
  try {
    const taxResponse = await updateTaxinformation(req.params.id, req.body);
    res.status(200).json(taxResponse);
  } catch (error) {
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const deleteTaxInformationController = async (req, res) => {
  try {
    const taxResponse = await deleteTaxInformation(req.params.id);
    res.status(200).json(taxResponse);
  } catch (error) {
    res
      .status(404)
      .json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

module.exports = {
  getTaxInformationController,
  createTaxInformationController,
  updateTaxInformationController,
  deleteTaxInformationController
};
