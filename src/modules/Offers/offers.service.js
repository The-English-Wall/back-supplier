import Offers from "./offers.model.js";

export class OffersService {

    async findAllOffers() {
        return await Offers.findAll({
            where: {
                isDeleted: false
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