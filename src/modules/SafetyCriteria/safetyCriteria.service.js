import SafetyCriteria from "./safetyCriteria.model.js";

export class SafetyCriteriaService {

    async findAllSafety() {
        return await SafetyCriteria.findAll({
            where: {
                status: true
            }
        })
    }

    async findOneSafety(id) {
        return await SafetyCriteria.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    async createSafetyCriteria(data, supplierId) {
        return await SafetyCriteria.create(data, supplierId)
    }

    async updateSafetyCriteria(safetyCriteria, data) {
        return await safetyCriteria.update(data)
    }

    async deleteSafetyCriteria(safetyCriteria) {
        return await safetyCriteria.update({
            status: false
        })
    }
}