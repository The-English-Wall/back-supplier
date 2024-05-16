import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database/database.js'

const TaxInformation = sequelize.define('tax_information', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    nonProfitResolution: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nonProfitDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    majorTaxPayer: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    majorTaxdate: {
        type: DataTypes.STRING,
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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default TaxInformation;