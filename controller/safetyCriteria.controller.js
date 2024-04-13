const { PATH_CONTROLLER } = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const { getAllSafetyCriteria, createSafetyCriteria, updateSafetyCriteria, deleteSafetyCriteria} = require("../services/safetyCriteria.service");

const getAllSafetyCriteriaController = async (req, res) => {
  try {
    const safetyCriteriaResponse = await getAllSafetyCriteria();
    res.status(200).json(safetyCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const createSafetyCriteriaController = async (req, res) => {
  try {
    const safetyCriteriaResponse = await createSafetyCriteria(req.params.id, req.body);
    res.status(200).json(safetyCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const updateSafetyCriteriaController = async (req, res) => {
  try {
    const safetyCriteriaResponse = await updateSafetyCriteria(req.params.id, req.body);
    res.status(200).json(safetyCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const deleteSafetyCriteriaController = async (req, res) => {
  try {
    const safetyCriteriaResponse = await deleteSafetyCriteria(req.params.id);
    res.status(200).json(safetyCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

module.exports = { getAllSafetyCriteriaController, createSafetyCriteriaController, updateSafetyCriteriaController, deleteSafetyCriteriaController }