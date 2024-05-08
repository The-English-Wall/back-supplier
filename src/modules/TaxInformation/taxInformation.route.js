import express from 'express'

export const router = express.Router();

import {
    findAllTaxInformation,
    findOneTaxInformation,
    createTaxiInformation,
    updateTaxInformation,
    deleteTaxInfomation
} from './taxInformation.controller.js'

router.route('/')
    .get(findAllTaxInformation)
router.route('/:id')
    .get(findOneTaxInformation)

router.route('/')
    .post(createTaxiInformation)
router.route('/:id')
    .patch(updateTaxInformation)
router.route('/:id')
    .delete(deleteTaxInfomation)