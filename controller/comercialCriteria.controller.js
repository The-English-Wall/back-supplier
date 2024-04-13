const { PATH_CONTROLLER, ERROR_MESSAGE } = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const { getComercialCriterias, createComercialCriteria, updateComercialCriteria, deleteComercialCriteria } = require("../services/comercialCriteria.service");


const getComercialCriteriaController = async (req, res) => {
  try {
    const comercialCriteriaResponse = await getComercialCriterias();
    res.status(200).json(comercialCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

const createComercialCriteriaController = async (req, res) => {
  try {
    const comercialCriteriaResponse = await createComercialCriteria(req.params.id, req.body);
    res.status(200).json(comercialCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

const updateComercialCriteriaController = async (req, res) => {
  try {
    const comercialCriteriaResponse = await updateComercialCriteria(req.params.id, req.body);
    res.status(200).json(comercialCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

const deleteComercialCriteriaController = async (req, res) => {
  try {
    const comercialCriteriaResponse = await deleteComercialCriteria(req.params.id);
    res.status(200).json(comercialCriteriaResponse);
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json(serviceFunctionResponse([], false, PATH_CONTROLLER, error.message));
  }
};

module.exports = { getComercialCriteriaController, createComercialCriteriaController, updateComercialCriteriaController, deleteComercialCriteriaController}