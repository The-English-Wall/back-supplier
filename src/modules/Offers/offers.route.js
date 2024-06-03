import express from 'express'

export const router = express.Router();

import {
    findAllOffers,
    findOneOffer,
    createOffer,
    updateOffer,
    deleteOffer,
    findAllOffersByUser,
    findAllOffersByTaxId,
    findAllInvitationOffers
} from './offers.controller.js'

router.route('/')
    .get(findAllOffers)
    .post(createOffer)

router.route('/:id')
    .get(findOneOffer)
    .patch(updateOffer)
    .delete(deleteOffer)

router.route('/by-user/:id')
    .get(findAllOffersByUser)

router.route('/by-taxid/:id')
    .get(findAllOffersByTaxId)

router.route('/invitations/:id')
    .get(findAllInvitationOffers)