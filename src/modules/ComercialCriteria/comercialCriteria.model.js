import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database/database.js'

const ComercialCriteria = sequelize.define('comercial_criteria', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'comercialCriteria_id'
    },
    isServiceSupplier: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    experienceYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hasPostSaleService: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hasTrainingService: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hasReturnPolicy: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hasWarranty: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    deliveryAverageDays: {
        type: DataTypes.INTEGER,
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

export default ComercialCriteria;