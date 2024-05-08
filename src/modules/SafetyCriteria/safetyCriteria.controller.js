import { AppError, catchAsync } from '../../errors/index.js'
import { qualificationSafetyResults } from '../../utils/qualificationSafetyCriteria.js'
import { validateSafetyCriteria, validatePartialSafetyCriteria } from './safetyCriteria.schema.js'
import { SafetyCriteriaService } from './safetyCriteria.service.js'

const safetyCriteriaService = new SafetyCriteriaService()

//controladores

export const findAllSafetyCriteria = catchAsync(async (req, res, next) => {
    const safetyCriteria = await safetyCriteriaService.findAllSafety()

    return res.status(200).json(safetyCriteria)
})

export const findOneSafetyCriteria = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const safetyCriteria = await safetyCriteriaService.findOneSafety(id)

    if (!safetyCriteria) {
        next(new AppError(`Safety Criteria whit id ${id} not found`))
    }

    return res.status(200).json(safetyCriteria)
})

export const createSafetyCriteria = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, safetyCriteriaData } = validateSafetyCriteria(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const qualificationResults = await qualificationSafetyResults(safetyCriteriaData)

    safetyCriteriaData.qualificationResults = qualificationResults;

    const safetyCriteria = await safetyCriteriaService.createSafetyCriteria(safetyCriteriaData)

    await safetyCriteriaService.updateSafetyCriteria(safetyCriteria)

    return res.status(201).json({
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
        next(new AppError(`Safety Criteria whit id ${id} not found`))
    }

    const qualificationResults = await qualificationSafetyResults(safetyCriteria)

    safetyCriteria.qualificationResults = qualificationResults;

    await safetyCriteriaService.updateSafetyCriteria(safetyCriteria, safetyCriteriaData)

    return res.status(200).json({
        status: 'success',
        message: 'Safety Criteria updated successfully',
        safetyCriteria,
        qualificationResults
    })
})

export const deleteSafetyCriteria = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const safetyCriteria = await safetyCriteriaService.findOneSafety(id)

    if (!safetyCriteria) {
        next(new AppError(`Safety Criteria whit id ${id} not found`))
    }

    await safetyCriteriaService.deleteSafetyCriteria(safetyCriteria)

    return res.status(200).json({
        status: 'success',
        message: 'Safety Criteria delete successfully'
    })
})