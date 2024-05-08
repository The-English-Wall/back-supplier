import { AppError, catchAsync } from '../../errors/index.js'
import { qualificationComercialResults } from '../../utils/qualificationComercialResults.js'
import { validateComercialCriteria, validatePartialComercialCriteria } from './comercialCriteria.schema.js'
import { ComercialCriteriaService } from './comercialCriteria.service.js'

const comercialCriteriaService = new ComercialCriteriaService()

export const findAllComercialCriteria = catchAsync(async (req, res, next) => {
    const comercialCriteria = await comercialCriteriaService.findAllCriteria()

    return res.status(200).json(comercialCriteria)
})

export const findOneComercialCriteria = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const comercialCriteria = await comercialCriteriaService.findOneCriteria(id)

    if (!comercialCriteria) {
        next(new AppError(`Comercial Criteria whit id ${id} not found`))
    }

    return res.status(200).json(comercialCriteria)
})

export const createComercialCriteria = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, comercialCriteriaData } = validateComercialCriteria(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const qualificationResults = await qualificationComercialResults(comercialCriteriaData)

    comercialCriteriaData.qualificationResults = qualificationResults;

    const comercialCriteria = await comercialCriteriaService.createCriteria(comercialCriteriaData)

    await comercialCriteriaService.updateCriteria(comercialCriteria)

    return res.status(201).json({
        comercialCriteria,
        qualificationResults
    })
})

export const updateComercialCriteria = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, comercialCriteriaData } = validatePartialComercialCriteria(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        });
    }

    const { id } = req.params;

    const comercialCriteria = await comercialCriteriaService.findOneCriteria(id);

    if (!comercialCriteria) {
        return next(new AppError(`Comercial Criteria with id ${id} not found`));
    }

    const qualificationResults = await qualificationComercialResults(comercialCriteria);

    comercialCriteria.qualificationResults = qualificationResults;

    await comercialCriteriaService.updateCriteria(comercialCriteria, comercialCriteriaData);

    return res.status(200).json({
        status: 'success',
        message: 'Comercial criteria updated successfully',
        comercialCriteria,
        qualificationResults
    });
});

export const deleteComercialCriteria = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const comercialCriteria = await comercialCriteriaService.findOneCriteria(id)

    if (!comercialCriteria) {
        next(new AppError(`Comercial Criteria whit id ${id} not found`))
    }

    await comercialCriteriaService.deteleCriteria(comercialCriteria)

    res.status(200).json(null)
})