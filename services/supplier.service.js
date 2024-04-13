const {
  SUCCESS_MESSAGE,
  SUCCESS_MESSAGE_EMPTY,
  PATH_SERVICE,
  ERROR_MESSAGE,
  CREATION_SUCCESS_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  DELETE_FAILURE_MESSAGE,
  ERROR_MESSAGE_DUPLICATE,
} = require("../helpers/constans");
const { serviceFunctionResponse } = require("../helpers/response");
const Supplier = require("../models/Supplier");
const { Op } = require("sequelize");

const getAllSuppliers = async () => {
  try {
    const supplierFound = await Supplier.findAll();
    const supplierEnabled = supplierFound.filter(
      (supplier) => supplier.isDelete === false
    );
    if (supplierEnabled.length > 0) {
      return serviceFunctionResponse(supplierEnabled, true, PATH_SERVICE);
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

const getSuppliersByQuery = async (data) => {
  try {
    const supplierFound = await Supplier.findAll({
      where: {
        [Op.or]: [{ supplierName: data.supplierName }, { taxId: data.taxId }],
      },
    });
    const supplierEnabled = supplierFound.filter(
      (supplier) => supplier.isDelete === false
    );
    if (supplierEnabled.length > 0) {
      return serviceFunctionResponse(supplierEnabled, true, PATH_SERVICE);
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

const createSupplier = async (supplier) => {
  try {
    const [supplierCreated, created] = await Supplier.findOrCreate({
      where: {taxId: supplier.taxId},
      defaults: supplier
    });
    if(created) {
      return serviceFunctionResponse(
        supplierCreated,
        true,
        PATH_SERVICE,
        CREATION_SUCCESS_MESSAGE
      );
    } else {
      return serviceFunctionResponse(
        supplierCreated,
        false,
        PATH_SERVICE,
        ERROR_MESSAGE_DUPLICATE
      );
    }
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
};

const updateSupplier = async (supplier, id) => {
  try {
    const supplierUpdated = await Supplier.update(supplier, {
      where: { id: id },
    });
    return serviceFunctionResponse(
      supplierUpdated[0] === 1 ? supplier : [],
      true,
      PATH_SERVICE,
      UPDATE_SUCCESS_MESSAGE
    );
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
};

const deleteSupplier = async (id) => {
  try {
    const supplierFound = await Supplier.findOne({ where: { id: id } });
    if (supplierFound.isDelete === true) {
      return serviceFunctionResponse(
        [],
        false,
        PATH_SERVICE,
        DELETE_FAILURE_MESSAGE
      );
    } else {
      const supplierUpdated = await Supplier.update({ isDelete: true },{
          where: { id: id },
        });
      return serviceFunctionResponse(
        supplierUpdated,
        true,
        PATH_SERVICE,
        DELETE_SUCCESS_MESSAGE
      );
    }
  } catch (error) {
    return serviceFunctionResponse(error, false, PATH_SERVICE, ERROR_MESSAGE);
  }
};

module.exports = {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliersByQuery,
};
