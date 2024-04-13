const { PATH_CONTROLLER } = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const { getAllHseqCriteria, createHseqCriteria, updateHseqCriteria, deleteHseqCriteria } = require("../services/hseqCriteria.service");

const getAllHseqCriteriaController = async (req, res) => {
  try {
    const hseqCriteriaResponse = await getAllHseqCriteria();
    res.status(200).json(hseqCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const createHseqCriteriaController = async (req, res) => {
  try {
    const hseqCriteriaResponse = await createHseqCriteria(req.params.id, req.body);
    res.status(200).json(hseqCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const updateHseqCriteriaController = async (req, res) => {
  try {
    const hseqCriteriaResponse = await updateHseqCriteria(req.params.id, req.body);
    res.status(200).json(hseqCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};
const deleteHseqCriteriaController = async (req, res) => {
  try {
    const hseqCriteriaResponse = await deleteHseqCriteria(req.params.id);
    res.status(200).json(hseqCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

module.exports = { getAllHseqCriteriaController, createHseqCriteriaController, updateHseqCriteriaController, deleteHseqCriteriaController }