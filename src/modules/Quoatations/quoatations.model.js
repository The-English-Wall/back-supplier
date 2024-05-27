import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Quoatations = sequelize.define(
    'quoatations',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        supplierId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taxId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deliveryDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deliveryPlace: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0.0
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true
        },
        statusOpen: {
            type: DataTypes.ENUM('created', 'closed'),
            allowNull: false,
            defaultValue: 'created'
        },
        productList: {
            type: DataTypes.JSON,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
)

export default Quoatations;