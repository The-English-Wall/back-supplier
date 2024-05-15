import express from 'express'

export const router = express.Router();

import {
    findAllTaxInformation,
    findOneTaxInformation,
    createTaxiInformation,
    updateTaxInformation,
    deleteTaxInfomation
} from './taxInformation.controller.js'

import { validateExistTaxInformation } from './taxInformation.middleware.js'

router.route('/')
    .get(findAllTaxInformation)
router.route('/:id')
    .get(validateExistTaxInformation, findOneTaxInformation)

router.route('/:id')
    .post(createTaxiInformation)
router.route('/:id')
    .patch(updateTaxInformation)
router.route('/:id')
    .delete(deleteTaxInfomation)