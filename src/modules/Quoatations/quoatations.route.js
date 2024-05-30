import express from 'express'

export const router = express.Router();

import {
    findAllQuoatations,
    findAllQuoatationsByOfferId,
    findOneQuoatations,
    createQuoatations,
    updateQuoatations,
    deleteQuoatations
} from './quoatations.controller.js'

router.route('/')
    .get(findAllQuoatations)

router.route('/quotation-by-offer')
    .get(findAllQuoatationsByOfferId)


router.route('/:id')
    .get(findOneQuoatations)
    .post(createQuoatations)
    .patch(updateQuoatations)
    .delete(deleteQuoatations)