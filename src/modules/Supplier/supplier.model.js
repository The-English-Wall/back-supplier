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
        contactName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Cedula"
        },
        idType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "234234"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "av siempre viva"
        },
        codeArea: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "57"
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "3001000000"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Colombia"
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Antioquia"
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Medellin"
        },
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        legalType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Cedula"
        },
        legalManagerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        legalManagerId: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "1"
        },
        legalManagerEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "jhondoe@doe.com"
        },
        categoryGroup: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Materias Primas"
        },
        categoryFamily: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Productos Quimicos"
        },
        categoryLine: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Acidos corrosivos"
        },
        taxId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })

export default Supplier;