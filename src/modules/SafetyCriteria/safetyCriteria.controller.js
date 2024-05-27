import { AppError, catchAsync } from '../../errors/index.js'
import { qualificationSafetyResults } from '../../utils/qualificationSafetyCriteria.js'
import { validateSafetyCriteria, validatePartialSafetyCriteria } from './safetyCriteria.schema.js'
import { SafetyCriteriaService } from './safetyCriteria.service.js'
import { supplierService } from '../Supplier/supplier.controller.js'
import SafetyCriteria from './safetyCriteria.model.js'
import { ERROR_SAFETY_MESSAGES } from '../../utils/errorsMessagesHandle.js'
import { SUCCESS_MESSAGES } from '../../utils/succesMessages.js'

const safetyCriteriaService = new SafetyCriteriaService()

export const findAllSafetyCriteria = catchAsync(async (req, res, next) => {
    const safetyCriteria = await safetyCriteriaService.findAllSafety()

    return res.status(200).json(safetyCriteria)
})

export const findOneSafetyCriteria = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const safetyCriteria = await safetyCriteriaService.findOneSafety(id)

    if (!safetyCriteria) {
        next(new AppError(ERROR_SAFETY_MESSAGES.error_safety_not_found), 404)
    }

    return res.status(200).json({
        ok: true,
        safetyCriteria
    })
})

export const createSafetyCriteria = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, safetyCriteriaData } = validateSafetyCriteria(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params;

    const supplier = supplierService.finOneSupplier(id)

    if (!supplier) {
        return next(new AppError(ERROR_SAFETY_MESSAGES.error_safety_not_found, 404));
    }

    const existingCriteria = await SafetyCriteria.findOne({ where: { supplier_id: id } });

    if (existingCriteria) {
        return next(new AppError(ERROR_SAFETY_MESSAGES.error_safety_supplier_exist, 409));
    }

    const qualificationResults = await qualificationSafetyResults(safetyCriteriaData)

    safetyCriteriaData.qualificationResults = qualificationResults;

    const safetyCriteria = await safetyCriteriaService.createSafetyCriteria({ ...safetyCriteriaData, supplier_id: id })

    await safetyCriteriaService.updateSafetyCriteria(safetyCriteria)

    return res.status(201).json({
        ok: true,
        safetyCriteria,
        qualificationResults
    })
})

export const updateSafetyCriteria = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, safetyCriteriaData } = validatePartialSafetyCriteria(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params

    const safetyCriteria = await safetyCriteriaService.findOneSafety(id)

    if (!safetyCriteria) {
        next(new AppError(ERROR_SAFETY_MESSAGES.error_safety_not_found, 404))
    }

    const qualificationResults = await qualificationSafetyResults(safetyCriteria)

    safetyCriteria.qualificationResults = qualificationResults;

    await safetyCriteriaService.updateSafetyCriteria(safetyCriteria, safetyCriteriaData)

    return res.status(200).json(SUCCESS_MESSAGES.success_safety_updated, {
        safetyCriteria,
        qualificationResults
    })
})

export const deleteSafetyCriteria = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const safetyCriteria = await safetyCriteriaService.findOneSafety(id)

    if (!safetyCriteria) {
        next(new AppError(ERROR_SAFETY_MESSAGES.error_safety_not_found, 404))
    }

    await safetyCriteriaService.deleteSafetyCriteria(safetyCriteria)

    return res.status(200).json(SUCCESS_MESSAGES.success_safety_deleted)
})