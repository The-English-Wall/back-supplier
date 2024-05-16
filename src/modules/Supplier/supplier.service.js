import Supplier from "./supplier.model.js";
import { BASE_URL_COMPANY } from "../../config/conections/axios.config.js";
import axios from "axios";

export class SupplierService {

    async findAllSupplier() {
        const { data } = await axios.get('http://localhost:3000/api/v1/company')
        console.log(data)
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

    async deleteOrganization(supplier) {
        return await supplier.update({
            status: false
        })
    }
}