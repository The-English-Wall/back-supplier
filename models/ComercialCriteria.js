const { sequelize, DataTypes, Op } = require("../database/database");
const Supplier = require("./Supplier");

const ComercialCriteria = sequelize.define(
  "comercialCriteria",
  {
    isServiceSupplier: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    hasPostSaleService: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    hasTrainingService: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    hasReturnPolicy: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    hasWarranty: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    deliveryAverageDays: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    qualificationResults: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      allowNull: true,
    },
    supplierId: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: false
    },
    isDelete:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    frezzeTableName: true,
  }
);

// const { supplier, taxinformation } = sequelize.models;

// supplier.hasOne(taxinformation);
// taxinformation.belongsTo(supplier);

// Supplier.hasOne(ComercialCriteria, { foreignKey: { allowNull: false } });
// ComercialCriteria.belongsTo(Supplier);

module.exports = ComercialCriteria;