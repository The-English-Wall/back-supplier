import Quoatations from "./quoatations.model.js"

export class QuoatationsService {

    async findAllQuoatations() {
        return await Quoatations.findAll({
            where: {
                isDeleted: false
            }
        })
    }

    async findOneQuoatations(id) {
        return await Quoatations.findOne({
            where: {
                isDeleted: false,
                id: id
            }
        })
    }

    async createQuoatations(data) {
        return await Quoatations.create(data)
    }

    async updateQuoatations(quoatations, data) {
        return await quoatations.update(data)
    }

    async deleteQuoatations(quoatations) {
        return await quoatations.update({
            isDeleted: true
        })
    }
}