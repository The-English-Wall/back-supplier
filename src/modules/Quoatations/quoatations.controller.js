import { catchAsync, AppError } from '../../errors/index.js'
import { QuoatationsService } from './quoatations.service.js'
import { validateQuoatations, validatePartialQuoatations } from './quoatations.schema.js'
import { ERROR_OFFERS_MESSAGES, ERROR_QUOATATIONS_MESSAGES } from '../../utils/errorsMessagesHandle.js'
import { SUCCESS_MESSAGES } from '../../utils/succesMessages.js'

const quoatationsService = new QuoatationsService()

export const findAllQuoatations = catchAsync(async (req, res, next) => {
    const quoatations = await quoatationsService.findAllQuoatations()

    return res.status(200).json(quoatations)
})

export const findOneQuoatations = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const quoatations = await quoatationsService.findOneQuoatations(id)

    if (!quoatations) {
        next(new AppError(ERROR_QUOATATIONS_MESSAGES.error_quoatations_not_found, 404))
    }

    return res.status(200).json(quoatations)
})

export const createQuoatations = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, quoatationsData } = validateQuoatations(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const quoatations = await quoatationsService.createQuoatations(quoatationsData)

    return res.status(201).json(quoatations)
})

export const updateQuoatations = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, quoatationsData } = validatePartialQuoatations(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params;

    const quoatations = await quoatationsService.findOneQuoatations(id)

    if (!quoatations) {
        next(new AppError(ERROR_QUOATATIONS_MESSAGES.error_quoatations_not_found, 404))
    }

    const updatedQuoatations = await quoatationsService.updateQuoatations(quoatations, quoatationsData)

    return res.status(200).json(SUCCESS_MESSAGES.success_quoatations_updated, updatedQuoatations)
})

export const deleteQuoatations = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const quoatations = await quoatationsService.findOneQuoatations(id)

    if (!quoatations) {
        next(new AppError(ERROR_QUOATATIONS_MESSAGES.error_quoatations_not_found, 404))
    }

    await quoatationsService.deleteQuoatations(quoatations)

    res.status(200).json(SUCCESS_MESSAGES.success_quoatations_deleted)
})