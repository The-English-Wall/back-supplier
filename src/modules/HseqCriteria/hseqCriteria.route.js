import express from 'express'

export const router = express.Router();

import {
    findAllHseqCriteria,
    findOneHseqCriteria,
    createHseqCriteria,
    updateHseqCriteria,
    deleteHseqCriteria
} from './hseqCriteria.controller.js'

import { validateExistHseqCriteria } from './hseqCriteria.middleware.js'

router.route('/')
    .get(findAllHseqCriteria)
router.route('/:id')
    .get(validateExistHseqCriteria, findOneHseqCriteria)

router.route('/:id')
    .post(createHseqCriteria)
router.route('/:id')
    .patch(updateHseqCriteria)
router.route('/:id')
    .delete(deleteHseqCriteria)