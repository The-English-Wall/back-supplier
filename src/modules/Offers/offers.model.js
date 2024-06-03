import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Offers = sequelize.define(
    'offers',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'offer_id'
        },
        supplierList: {
            type: DataTypes.JSON,
            allowNull: false
        },
        limitOfferDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deliveryDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentTime: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deliveryPlace: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productList: {
            type: DataTypes.JSON,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        organizationTaxId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        statusOpen: {
            type: DataTypes.ENUM('open', 'pending', 'complete'),
            allowNull: false,
            defaultValue: 'open'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
)

export default Offers;