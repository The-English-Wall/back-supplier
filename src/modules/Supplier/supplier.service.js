import Supplier from "./supplier.model.js";

export class SupplierService {

    async findAllSupplier() {
        return await Supplier.findAll({
            where: {
                status: true,
            }
        })
    }

    async finOneSupplier(id) {
        return await Supplier.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    async createSupplier(data) {
        return await Supplier.create(data)
    }

    async updateSupplier(supplier, data) {
        return await supplier.update(data)
    }

    async findSupplierByTaxId(taxId) {
        return await Supplier.findOne({
            where: { taxId }
        })
    }

    async deleteSupplier(supplier) {
        return await supplier.update({
            status: false
        })
    }
}