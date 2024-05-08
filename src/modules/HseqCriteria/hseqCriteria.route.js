import express from 'express'

export const router = express.Router();

import {
    findAllHseqCriteria,
    findOneHseqCriteria,
    createHseqCriteria,
    updateHseqCriteria,
    deleteHseqCriteria
} from './hseqCriteria.controller.js'

router.route('/')
    .get(findAllHseqCriteria)
router.route('/:id')
    .get(findOneHseqCriteria)

router.route('/')
    .post(createHseqCriteria)
router.route('/:id')
    .patch(updateHseqCriteria)
router.route('/:id')
    .delete(deleteHseqCriteria)