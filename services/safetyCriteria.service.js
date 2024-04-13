
const SafetyCriteria = require("../models/SafetyCriteria");
const {SUCCESS_MESSAGE_EMPTY,PATH_SERVICE,ERROR_MESSAGE,CREATION_SUCCESS_MESSAGE,UPDATE_SUCCESS_MESSAGE,DELETE_SUCCESS_MESSAGE,ERROR_MESSAGE_DUPLICATE,ERROR_UPDATE_MESSAGE, SUCCESS_MESSAGE, ERROR_MESSAGE_ASSOCIATION_NOT_EXIST} = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const Supplier = require("../models/Supplier");
const { qualificationSafetyResults } = require("../helpers/utils");

const getAllSafetyCriteria = async () => {
  try {
    const safetyCriteraFound = await SafetyCriteria.findAll({where: {isDelete: false}})
    if(safetyCriteraFound.length <= 0) {
      return serviceFunctionResponse(
        [],
        true,
        PATH_SERVICE,
        SUCCESS_MESSAGE_EMPTY
      );
    }
    return serviceFunctionResponse(
      safetyCriteraFound,
      true,
      PATH_SERVICE,
      SUCCESS_MESSAGE
    );
  } catch (error) {
    console.log('error: ', error)
    return serviceFunctionResponse(
      error,
      false,
      PATH_SERVICE,
      ERROR_MESSAGE
    );
  }
}

const createSafetyCriteria = async (supplierId, safetyData) => {
  try {
    const supplierfound = await Supplier.findByPk(supplierId)
    if(supplierfound){
      const results = await qualificationSafetyResults(safetyData)
      const [safetyDataFound, created] = await SafetyCriteria.findOrCreate({
        where: { supplierId: supplierId },
        defaults: {...safetyData, qualificationResults: parseInt(results), supplierId: supplierId}
      })
      if(!created && safetyDataFound.isDelete === false) {
        return serviceFunctionResponse(
          [],
          false,
          PATH_SERVICE,
          ERROR_MESSAGE_DUPLICATE
        );
      }

      if(!created && safetyDataFound.isDelete === true) {
        await Supplier.update({safetyCriteriumId: safetyDataFound.id }, {where: {id: supplierId}})
        await SafetyCriteria.update({...safetyData, qualificationResults: parseInt(results),isDelete: false}, {where: {
          id: safetyDataFound.id 
        }})
        return serviceFunctionResponse(safetyData, true, PATH_SERVICE, CREATION_SUCCESS_MESSAGE);
      }

      if(created){
        await Supplier.update({safetyCriteriumId: safetyDataFound.id }, {where: {id: supplierId}})
        return serviceFunctionResponse(
          safetyDataFound,
          false,
          PATH_SERVICE,
          CREATION_SUCCESS_MESSAGE
        );
      }
    } else {
      return serviceFunctionResponse(
        [],
        false,
        PATH_SERVICE,
        ERROR_MESSAGE_ASSOCIATION_NOT_EXIST
      );
    }
  } catch (error) {
    console.log('error: ', error)
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}


const updateSafetyCriteria = async (id, body) => {
  try {
    const results = await qualificationSafetyResults(body)
    const updateSafetyData = await SafetyCriteria.update({...body, qualificationResults: parseInt(results)}, {where: {
      id: id
    }})
    return serviceFunctionResponse(
      updateSafetyData[0] === 1 ? updateSafetyData[0] : [],
      updateSafetyData[0] === 1 ? true : false,
      PATH_SERVICE,
      updateSafetyData[0] === 1 ? UPDATE_SUCCESS_MESSAGE : ERROR_UPDATE_MESSAGE
    );
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

const deleteSafetyCriteria = async (id) => {
  try {
    const safetyDataToDelete = await SafetyCriteria.update({ isDelete: true },{
      where: { id: id },
    });
    const [data, update] = await Supplier.update({safetyCriteriumId: null}, {where: {safetyCriteriumId: id}})
    return serviceFunctionResponse(
      safetyDataToDelete[0],
      true,
      PATH_SERVICE,
      DELETE_SUCCESS_MESSAGE
    );
  } catch (error) {
    console.log('error: ', error)
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

module.exports = {getAllSafetyCriteria, createSafetyCriteria, updateSafetyCriteria, deleteSafetyCriteria}