import express from 'express'

export const router = express.Router();

import {
    findAllComercialCriteria,
    findOneComercialCriteria,
    createComercialCriteria,
    updateComercialCriteria,
    deleteComercialCriteria
} from './comercialCriteria.controller.js'

router.route('/')
    .get(findAllComercialCriteria)
router.route('/:id')
    .get(findOneComercialCriteria)

router.route('/')
    .post(createComercialCriteria)
router.route('/:id')
    .patch(updateComercialCriteria)
router.route('/:id')
    .delete(deleteComercialCriteria)