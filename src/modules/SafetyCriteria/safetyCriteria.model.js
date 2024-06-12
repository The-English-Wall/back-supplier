import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const SafetyCriteria = sequelize.define('safety_criteria', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'safetyCriteria_id'
    },
    hasSarlaftSystems: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hasSagrilaftSystems: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hasSiplaftSystems: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hasOfacReport: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    qualificationResults: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default SafetyCriteria;