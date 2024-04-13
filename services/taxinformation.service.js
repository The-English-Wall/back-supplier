const {SUCCESS_MESSAGE_EMPTY,PATH_SERVICE,ERROR_MESSAGE,CREATION_SUCCESS_MESSAGE,UPDATE_SUCCESS_MESSAGE,DELETE_SUCCESS_MESSAGE,ERROR_MESSAGE_DUPLICATE,ERROR_UPDATE_MESSAGE, ERROR_MESSAGE_ASSOCIATION_NOT_EXIST} = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const TaxInformation = require("../models/TaxInformation");
const { qualificationTaxResults } = require("../helpers/utils");
const Supplier = require("../models/Supplier");

const getTaxInformation = async () => {
  try {
    const taxInfoFoundawait = await TaxInformation.findAll({
      where: {
        isDelete: false
      }
    });
    if (taxInfoFoundawait.length > 0) {
      return serviceFunctionResponse(taxInfoFoundawait, true, PATH_SERVICE);
    } else {
      return serviceFunctionResponse(
        [],
        false,
        PATH_SERVICE,
        SUCCESS_MESSAGE_EMPTY
      );
    }
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
};



const createTaxInformation = async (id, body) => {
  try {
    const supplierfound = await Supplier.findByPk(id)
    if(supplierfound){
      if(!body.taxInformationIsAvailable) {
        return serviceFunctionResponse(taxinformationFound, true, PATH_SERVICE, CREATION_SUCCESS_MESSAGE);
      }
      const results = await qualificationTaxResults(body)
      const [taxinformationFound, created] = await TaxInformation.findOrCreate({
        where: { supplierId: id },
        defaults: {...body, qualificationResults: parseInt(results), supplierId: id}
      });

      if(!created && taxinformationFound.isDelete === false) {
        return serviceFunctionResponse(
          [],
          false,
          PATH_SERVICE,
          ERROR_MESSAGE_DUPLICATE
        );
      }

      if(!created && taxinformationFound.isDelete === true) {
        await Supplier.update({taxinformationId: taxinformationFound.id }, {where: {id: id}})
        await TaxInformation.update({...body, isDelete: false}, {where: {
          id: taxinformationFound.id 
        }})
        return serviceFunctionResponse(body, true, PATH_SERVICE, CREATION_SUCCESS_MESSAGE);
      }

      if(created){
        await Supplier.update({taxinformationId: taxinformationFound.id }, {where: {id: id}})
        return serviceFunctionResponse(
          taxinformationFound,
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
};

const updateTaxinformation = async (id, body) => {
  try {
    const results = await qualificationTaxResults(body)
    const updateTaxData = await TaxInformation.update({...body, qualificationResults: parseInt(results)}, {where: {
      id: id
    }})
    return serviceFunctionResponse(
      updateTaxData[0] === 1 ? updateTaxData[0] : [],
      updateTaxData[0] === 1 ? true : false,
      PATH_SERVICE,
      updateTaxData[0] === 1 ? UPDATE_SUCCESS_MESSAGE : ERROR_UPDATE_MESSAGE
    );
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

const deleteTaxInformation = async (id) => {
  try {
    const taxInfoDelete = await TaxInformation.update({ isDelete: true },{
      where: { id: id },
    });
    const [data, update] = await Supplier.update({taxinformationId: null}, {where: {taxinformationId: id}})
    return serviceFunctionResponse(
      taxInfoDelete[0],
      true,
      PATH_SERVICE,
      DELETE_SUCCESS_MESSAGE
    );
  } catch (error) {
    console.log('error: ', error)
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
}

module.exports = { getTaxInformation, createTaxInformation, updateTaxinformation, deleteTaxInformation };
