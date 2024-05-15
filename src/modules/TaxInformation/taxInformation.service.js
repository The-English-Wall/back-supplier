import TaxInformation from './taxInformation.model.js'

export class TaxInformationService {

    async findAllTaxInfo() {
        return await TaxInformation.findAll({
            where: {
                status: true
            }
        })
    }

    async findOneTaxiInfo(id) {
        return await TaxInformation.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    async createTaxInfo(data, supplierId) {
        return await TaxInformation.create(data, supplierId)
    }

    async updateTaxInfo(taxInfo, data) {
        return await taxInfo.update(data)
    }

    async deleteTaxInfo(taxInfo) {
        return await taxInfo.update({
            status: false
        })
    }
}