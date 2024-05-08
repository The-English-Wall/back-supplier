import express from 'express'

export const router = express.Router();

import {
    findAllSafetyCriteria,
    findOneSafetyCriteria,
    createSafetyCriteria,
    updateSafetyCriteria,
    deleteSafetyCriteria
} from './safetyCriteria.controller.js'

router.route('/')
    .get(findAllSafetyCriteria)
router.route('/:id')
    .get(findOneSafetyCriteria)

router.route('/')
    .post(createSafetyCriteria)
router.route('/:id')
    .patch(updateSafetyCriteria)
router.route('/:id')
    .delete(deleteSafetyCriteria)