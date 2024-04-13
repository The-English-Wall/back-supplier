const ComercialCriteria = require("../models/ComercialCriteria")
const {SUCCESS_MESSAGE_EMPTY,PATH_SERVICE,ERROR_MESSAGE,CREATION_SUCCESS_MESSAGE,UPDATE_SUCCESS_MESSAGE,DELETE_SUCCESS_MESSAGE,ERROR_MESSAGE_DUPLICATE,ERROR_UPDATE_MESSAGE, SUCCESS_MESSAGE, ERROR_MESSAGE_ASSOCIATION_NOT_EXIST} = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const {qualificationComercialResults} = require("../helpers/utils")
const Supplier = require("../models/Supplier");

const getComercialCriterias = async () => {
  try {
    const comercialListInformation = await ComercialCriteria.findAll({where: {isDelete: false}})
    if(comercialListInformation.length === 0) {
      return serviceFunctionResponse(
        [],
        true,
        PATH_SERVICE,
        SUCCESS_MESSAGE_EMPTY
      );
    }
    return serviceFunctionResponse(
      comercialListInformation,
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

const createComercialCriteria = async (supplierId, comercialData) => {
  try {
    const supplierfound = await Supplier.findByPk(supplierId)
    if(supplierfound){
      const results = await qualificationComercialResults(comercialData)
      const [comercialDataFound, created] = await ComercialCriteria.findOrCreate({
        where: { supplierId: supplierId },
        defaults: {...comercialData, qualificationResults: parseInt(results), supplierId: supplierId}
      })
      if(!created && comercialDataFound.isDelete === false) {
        return serviceFunctionResponse(
          [],
          false,
          PATH_SERVICE,
          ERROR_MESSAGE_DUPLICATE
        );
      }

      if(!created && comercialDataFound.isDelete === true) {
        await Supplier.update({comercialCriteriumId: comercialDataFound.id }, {where: {id: supplierId}})
        await ComercialCriteria.update({...comercialData, isDelete: false}, {where: {
          id: comercialDataFound.id 
        }})
        return serviceFunctionResponse(comercialData, true, PATH_SERVICE, CREATION_SUCCESS_MESSAGE);
      }

      if(created){
        await Supplier.update({comercialCriteriumId: comercialDataFound.id }, {where: {id: supplierId}})
        return serviceFunctionResponse(
          comercialDataFound,
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

const updateComercialCriteria = async (id, body) => {
  try {
    const results = await qualificationComercialResults(body)
    const updateComercialData = await ComercialCriteria.update({...body, qualificationResults: parseInt(results)}, {where: {
      id: id
    }})
    return serviceFunctionResponse(
      updateComercialData[0] === 1 ? updateComercialData[0] : [],
      updateComercialData[0] === 1 ? true : false,
      PATH_SERVICE,
      updateComercialData[0] === 1 ? UPDATE_SUCCESS_MESSAGE : ERROR_UPDATE_MESSAGE
    );
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

const deleteComercialCriteria = async (id) => {
  try {
    const comercialDataToDelete = await ComercialCriteria.update({ isDelete: true },{
      where: { id: id },
    });
    const [data, update] = await Supplier.update({comercialCriteriumId: null}, {where: {comercialCriteriumId: id}})
    return serviceFunctionResponse(
      comercialDataToDelete[0],
      true,
      PATH_SERVICE,
      DELETE_SUCCESS_MESSAGE
    );
  } catch (error) {
    console.log('error: ', error)
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

module.exports = { getComercialCriterias, createComercialCriteria, updateComercialCriteria, deleteComercialCriteria }