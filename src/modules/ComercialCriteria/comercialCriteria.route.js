import express from 'express'

export const router = express.Router();

import {
    findAllComercialCriteria,
    findOneComercialCriteria,
    createComercialCriteria,
    updateComercialCriteria,
    deleteComercialCriteria
} from './comercialCriteria.controller.js'

import { validateExistComercial } from './comercialCriteria.middleware.js'

router.route('/')
    .get(findAllComercialCriteria)
router.route('/:id')
    .get(validateExistComercial, findOneComercialCriteria)

router.route('/:id')
    .post(createComercialCriteria)
router.route('/:id')
    .patch(updateComercialCriteria)
router.route('/:id')
    .delete(deleteComercialCriteria)