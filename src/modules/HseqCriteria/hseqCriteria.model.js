import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const HseqCriteria = sequelize.define('hseq_criteria', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'hseqCriteria_id'
    },
    hasQualityCertified: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hasEnvironmentCertified: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hasSafetyCertified: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hasSstCertified: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hasSupplyChainSafetyCertified: {
        type: DataTypes.JSON,
        allowNull: true
    },
    enterToFacilities: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    workType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accidentRatio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0
    },
    qualificationResults: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default HseqCriteria;