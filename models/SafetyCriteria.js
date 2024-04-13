const { sequelize, DataTypes, Op } = require("../database/database");

const SafetyCriteria = sequelize.define(
  "safetyCriteria",
  {
    hasSarlaftSystems: {
      type: DataTypes.JSON,
      defaultValue: {
        notApplicable: true,
        hasSystem: true
      },
      allowNull: true,
    },
    hasSagrilaftSystems: {
      type: DataTypes.JSON,
      defaultValue: {
        notApplicable: true,
        hasSystem: true
      },
      allowNull: true,
    },
    hasSiplaftSystems: {
      type: DataTypes.JSON,
      defaultValue: {
        notApplicable: true,
        hasSystem: true
      },
      allowNull: true,
    },
    hasOfacReport: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

module.exports = SafetyCriteria;