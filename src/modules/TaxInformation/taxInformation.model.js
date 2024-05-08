import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database/database.js'

const TaxInformation = sequelize.define('tax_information', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'tax_id'
    },
    nonProfitResolution: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nonProfitDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    majorTaxPayer: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    majorTaxdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    regimeType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentAssets: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    currentLiabilities: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    inventories: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    financialObligations: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    netWorth: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    qualificationResults: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0
    },
    taxInformationIsAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: true, //True para probar endpoint cambiar a false con las asociaciones 
        field: 'supplier_id'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default TaxInformation;