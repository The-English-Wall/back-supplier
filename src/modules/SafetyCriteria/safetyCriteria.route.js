import express from 'express'

export const router = express.Router();

import {
    findAllSafetyCriteria,
    findOneSafetyCriteria,
    createSafetyCriteria,
    updateSafetyCriteria,
    deleteSafetyCriteria
} from './safetyCriteria.controller.js'

import { validateExistSafety } from './safetyCriteria.middleware.js'

router.route('/')
    .get(findAllSafetyCriteria)
router.route('/:id')
    .get(validateExistSafety, findOneSafetyCriteria)

router.route('/:id')
    .post(createSafetyCriteria)
router.route('/:id')
    .patch(updateSafetyCriteria)
router.route('/:id')
    .delete(deleteSafetyCriteria)