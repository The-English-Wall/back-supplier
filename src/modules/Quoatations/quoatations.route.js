import express from 'express'

export const router = express.Router();

import {
    findAllQuoatations,
    findOneQuoatations,
    createQuoatations,
    updateQuoatations,
    deleteQuoatations
} from './quoatations.controller.js'

router.route('/')
    .get(findAllQuoatations)
    .post(createQuoatations)

router.route('/:id')
    .get(findOneQuoatations)
    .patch(updateQuoatations)
    .delete(deleteQuoatations)