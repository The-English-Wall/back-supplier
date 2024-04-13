const { sequelize, DataTypes, Op } = require("../database/database");

const HseqCriteria = sequelize.define(
  "hseqCriteria",
  {
    hasQualityCertified: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    hasEnvironmentCertified: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    hasSafetyCertified: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    hasSstCertified: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    hasSupplyChainSafetyCertified: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    },
    enterToFacilities: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    workType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null
    },
    accidentRatio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
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

module.exports = HseqCriteria;