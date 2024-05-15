import { DataTypes } from "sequelize";
import { sequelize } from '../../config/database/database.js'

const Supplier = sequelize.define(
    'supplier',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'supplier_id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codeArea: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        legalType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        legalManagerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        legalManagerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        legalManagerEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryGroup: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categoryFamily: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categoryLine: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        taxId: {
            type: DataTypes.INTEGER,
            allowNull: true, //este estado es solo para prueba de endpoint, cambiar a false
            field: 'tax_id'
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })

export default Supplier;