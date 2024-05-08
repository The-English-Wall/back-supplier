import ComercialCriteria from "./comercialCriteria.model.js";

export class ComercialCriteriaService {

    async findAllCriteria() {
        return await ComercialCriteria.findAll({
            where: {
                status: true
            }
        })
    }

    async findOneCriteria(id) {
        return await ComercialCriteria.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    async createCriteria(data) {
        return await ComercialCriteria.create(data)
    }

    async updateCriteria(comercial, data) {
        return await comercial.update(data)
    }

    async deteleCriteria(comercial) {
        return await comercial.update({
            status: false
        })
    }
}