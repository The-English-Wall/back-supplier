import { AppError, catchAsync } from '../../errors/index.js'
import { qualificationTaxResults } from '../../utils/qualificationTaxInformationResulst.js'
import { validateTaxInformation, validatePartialTaxInformation } from './taxInformation.schema.js'
import { TaxInformationService } from './taxInformation.service.js'

const taxInformationService = new TaxInformationService()

//controllers

export const findAllTaxInformation = catchAsync(async (req, res, next) => {

    const taxInformation = await taxInformationService.findAllTaxInfo()

    return res.status(200).json(taxInformation)
})

export const findOneTaxInformation = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const taxInformation = await taxInformationService.findOneTaxiInfo(id)

    if (!taxInformation) {
        next(new AppError(`Tax Information whit id ${id} not found`))
    }

    return res.status(200).josn(taxInformation)
})

export const createTaxiInformation = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, taxInfoData } = validateTaxInformation(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const qualificationResults = await qualificationTaxResults(taxInfoData)

    taxInfoData.qualificationResults = qualificationResults;

    const taxInformation = await taxInformationService.createTaxInfo(taxInfoData)

    await taxInformationService.updateTaxInfo(taxInformation)

    return res.status(201).json({
        taxInformation,
        qualificationResults
    })
})

export const updateTaxInformation = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, taxInfoData } = validatePartialTaxInformation(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params

    const taxInformation = await taxInformationService.findOneTaxiInfo(id)

    if (!taxInformation) {
        next(new AppError(`Tax Information whit id ${id} not found`))
    }

    const qualificationResults = await qualificationTaxResults(taxInformation)

    taxInformation.qualificationResults = qualificationResults

    await taxInformationService.updateTaxInfo(taxInformation, taxInfoData)

    return res.stauts(200).json({
        status: 'success',
        message: 'Tax Information updated successfully',
        taxInformation,
        qualificationResults
    })
})

export const deleteTaxInfomation = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const taxInformation = await taxInformationService.findOneTaxiInfo(id)

    if (!taxInformation) {
        next(new AppError(`Tax Information whit id ${id} not found`))
    }

    await taxInformationService.deleteTaxInfo(taxInformation)

    res.satus(200).json({
        status: 'success',
        message: 'Tax Information delete successfully'
    })
})