const { sequelize, DataTypes, Op } = require("../database/database");
const ComercialCriteria = require("./ComercialCriteria");
const HseqCriteria = require("./HseqCriteria");
const SafetyCriteria = require("./SafetyCriteria");
const TaxInformation = require("./TaxInformation");

const Supplier = sequelize.define(
  "supplier",
  {
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierType: {
      type: DataTypes.STRING,
    },
    idType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legalType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codeArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legalManagerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legalManagerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legalManagerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryGroup: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    categoryFamily: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    categoryLine: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    frezzeTableName: true,
  }
);

const mod = sequelize.models;

console.log("models", mod);

TaxInformation.hasOne(Supplier, { foreignKey: { allowNull: true } });
Supplier.belongsTo(TaxInformation);

ComercialCriteria.hasOne(Supplier, { foreignKey: { allowNull: true } })
Supplier.belongsTo(ComercialCriteria);

HseqCriteria.hasOne(Supplier, { foreignKey: { allowNull: true } })
Supplier.belongsTo(HseqCriteria);

SafetyCriteria.hasOne(Supplier, { foreignKey: { allowNull: true } })
Supplier.belongsTo(SafetyCriteria);
// TaxInformation.belongsToMany(Supplier, {through: "TEST"})
// Supplier.belongsToMany(TaxInformation, {through: "TEST"})


module.exports = Supplier;
