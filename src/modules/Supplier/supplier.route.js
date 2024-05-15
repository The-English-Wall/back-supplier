import express from 'express'

export const router = express.Router();

import {
    findAllSupplier,
    findOneSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from './supplier.controller.js'

import { validateExistSupplier } from './supplier.middleware.js'

router.route('/')
    .get(findAllSupplier)
router.route('/:id')
    .get(validateExistSupplier, findOneSupplier)

router.route('/')
    .post(createSupplier)

router.route('/:id')
    .patch(updateSupplier)
router.route('/:id')
    .delete(deleteSupplier)