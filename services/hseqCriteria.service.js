const HseqCriteria = require("../models/HseqCriteria")
const {SUCCESS_MESSAGE_EMPTY,PATH_SERVICE,ERROR_MESSAGE,CREATION_SUCCESS_MESSAGE,UPDATE_SUCCESS_MESSAGE,DELETE_SUCCESS_MESSAGE,ERROR_MESSAGE_DUPLICATE,ERROR_UPDATE_MESSAGE, SUCCESS_MESSAGE, ERROR_MESSAGE_ASSOCIATION_NOT_EXIST} = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const Supplier = require("../models/Supplier");
const { qualificationHseqResults } = require("../helpers/utils");

const getAllHseqCriteria = async () => {
  try {
    const hseqCriteraFound = await HseqCriteria.findAll({where: {isDelete: false}})
    if(hseqCriteraFound.length <= 0) {
      return serviceFunctionResponse(
        [],
        true,
        PATH_SERVICE,
        SUCCESS_MESSAGE_EMPTY
      );
    }
    return serviceFunctionResponse(
      hseqCriteraFound,
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

const createHseqCriteria = async (supplierId, hseqData) => {
  try {
    const supplierfound = await Supplier.findByPk(supplierId)
    if(supplierfound){
      const results = await qualificationHseqResults(hseqData)
      const [hseqDataFound, created] = await HseqCriteria.findOrCreate({
        where: { supplierId: supplierId },
        defaults: {...hseqData, qualificationResults: parseInt(results), supplierId: supplierId}
      })

      if(!created && hseqDataFound.isDelete === false) {
        return serviceFunctionResponse(
          [],
          false,
          PATH_SERVICE,
          ERROR_MESSAGE_DUPLICATE
        );
      }

      if(!created && hseqDataFound.isDelete === true) {
        await Supplier.update({hseqCriteriumId: hseqDataFound.id }, {where: {id: supplierId}})
        await HseqCriteria.update({...hseqData, isDelete: false}, {where: {
          id: hseqDataFound.id 
        }})
        return serviceFunctionResponse(hseqDataFound ? hseqData : hseqDataFound, true, PATH_SERVICE, CREATION_SUCCESS_MESSAGE);
      }

      if(created){
        await Supplier.update({hseqCriteriumId: hseqDataFound.id }, {where: {id: supplierId}})
        return serviceFunctionResponse(
          hseqDataFound,
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


const updateHseqCriteria = async (id, body) => {
  try {
    const results = await qualificationHseqResults(body)
    const updateHseqData = await HseqCriteria.update({...body, qualificationResults: parseInt(results)}, {where: {
      id: id
    }})
    return serviceFunctionResponse(
      updateHseqData[0] === 1 ? updateHseqData[0] : [],
      updateHseqData[0] === 1 ? true : false,
      PATH_SERVICE,
      updateHseqData[0] === 1 ? UPDATE_SUCCESS_MESSAGE : ERROR_UPDATE_MESSAGE
    );
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

const deleteHseqCriteria = async (id) => {
  try {
    const hseqDataToDelete = await HseqCriteria.update({ isDelete: true },{
      where: { id: id },
    });
    const [data, update] = await Supplier.update({hseqCriteriumId: null}, {where: {hseqCriteriumId: id}})
    return serviceFunctionResponse(
      hseqDataToDelete[0],
      true,
      PATH_SERVICE,
      DELETE_SUCCESS_MESSAGE
    );
  } catch (error) {
    console.log('error: ', error)
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

module.exports = { getAllHseqCriteria, createHseqCriteria, updateHseqCriteria, deleteHseqCriteria }