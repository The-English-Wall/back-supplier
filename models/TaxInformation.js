const { sequelize, DataTypes, Op } = require("../database/database");
const Supplier = require("./Supplier");

const TaxInformation = sequelize.define(
  "taxinformation",
  {
    nonProfitResolution: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    nonProfitDate: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    majorTaxPayer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    majorTaxdate: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    regimeType: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    currentAssets: {
      type: DataTypes.DECIMAL,
      defaultValue: null,
      allowNull: true,
    },
    currentLiabilities: {
      type: DataTypes.DECIMAL,
      defaultValue: null,
      allowNull: true,
    },
    inventories: {
      type: DataTypes.DECIMAL,
      defaultValue: null,
      allowNull: true,
    },
    financialObligations: {
      type: DataTypes.DECIMAL,
      defaultValue: null,
      allowNull: true,
    },
    netWorth: {
      type: DataTypes.DECIMAL,
      defaultValue: null,
      allowNull: true,
    },
    qualificationResults: {
      type: DataTypes.DECIMAL,
      defaultValue: null,
      allowNull: true,
    },
    taxInformationIsAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

// Supplier.hasOne(TaxInformation, { foreignKey: { allowNull: false } });
// TaxInformation.belongsTo(Supplier);
// const { supplier, taxinformation } = sequelize.models;

// supplier.hasOne(taxinformation);
// taxinformation.belongsTo(supplier);


module.exports = TaxInformation;
