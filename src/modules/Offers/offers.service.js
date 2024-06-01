import Offers from "./offers.model.js";

export class OffersService {

    async findAllOffers() {
        return await Offers.findAll({
            where: {
                isDeleted: false
            }
        })
    }
    async findAllOffersByTaxId(taxId) {
        return await Offers.findAll({
            where: {
                isDeleted: false,
                organizationTaxId: taxId
            }
        })
    }
    
    async findAllOffersByCompanyId(companyId) {
        return await Offers.findAll({
            where: {
                isDeleted: false,
                companyId: companyId
            }
        })
    }

    async findOneOffer(id) {
        return await Offers.findOne({
            where: {
                isDeleted: false,
                id: id
            }
        })
    }

    async findOneOfferByUserId(userId) {
        return await Offers.findAll({
            where: {
                isDeleted: false,
                userId: userId
            }
        })
    }

    async createOffer(data) {
        return await Offers.create(data)
    }

    async updateOffer(offer, data) {
        return await offer.update(data)
    }

    async deleteOffer(offer) {
        return await offer.update({
            isDeleted: true
        })
    }
}