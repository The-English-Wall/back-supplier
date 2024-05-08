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
        type: DataTypes.STRING,
        allowNull: true
    },
    hasSagrilaftSystems: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hasSiplaftSystems: {
        type: DataTypes.STRING,
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
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: true, //Cambiar a false, cuando se realicen las asociaciones
        field: 'supplier_id'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default SafetyCriteria;