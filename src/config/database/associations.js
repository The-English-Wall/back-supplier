import Supplier from "../../modules/Supplier/supplier.model.js"
import TaxInformation from "../../modules/TaxInformation/taxInformation.model.js"
import ComercialCriteria from "../../modules/ComercialCriteria/comercialCriteria.model.js"
import SafetyCriteria from "../../modules/SafetyCriteria/safetyCriteria.model.js"
import HseqCriteria from "../../modules/HseqCriteria/hseqCriteria.model.js"

export const initModel = () => {
    Supplier.hasOne(ComercialCriteria, { foreignKey: 'supplier_id' })
    ComercialCriteria.belongsTo(Supplier, { foreignKey: 'supplier_id' })

    Supplier.hasOne(TaxInformation, { foreignKey: 'supplier_id' })
    TaxInformation.belongsTo(Supplier, { foreignKey: 'supplier_id' })

    Supplier.hasOne(SafetyCriteria, { foreignKey: 'supplier_id' })
    SafetyCriteria.belongsTo(Supplier, { foreignKey: 'supplier_id' })

    Supplier.hasOne(HseqCriteria, { foreignKey: 'supplier_id' })
    HseqCriteria.belongsTo(Supplier, { foreignKey: 'supplier_id' })
}