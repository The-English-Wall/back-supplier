import express from 'express'

export const router = express.Router();

import {
    findAllOffers,
    findOneOffer,
    createOffer,
    updateOffer,
    deleteOffer
} from './offers.controller.js'

router.route('/')
    .get(findAllOffers)
    .post(createOffer)

router.route('/:id')
    .get(findOneOffer)
    .patch(updateOffer)
    .delete(deleteOffer)