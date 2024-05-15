import HseqCriteria from "./hseqCriteria.model.js";

export class HseqCriteriaService {

    async findAllHseq() {
        return await HseqCriteria.findAll({
            where: {
                status: true
            }
        })
    }

    async findOneHseq(id) {
        return await HseqCriteria.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    async createHseq(data, supplierId) {
        return await HseqCriteria.create(data, supplierId)
    }

    async updateHseq(hseq, data) {
        return await hseq.update(data)
    }

    async deleteHseq(hseq) {
        return await hseq.update({
            status: false
        })
    }
}