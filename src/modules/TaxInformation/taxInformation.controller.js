import { AppError, catchAsync } from '../../errors/index.js'
import { qualificationTaxResults } from '../../utils/qualificationTaxInformationResulst.js'
import { validateTaxInformation, validatePartialTaxInformation } from './taxInformation.schema.js'
import { TaxInformationService } from './taxInformation.service.js'
import { supplierService } from '../Supplier/supplier.controller.js'
import TaxInformation from './taxInformation.model.js'
import { ERROR_SUPPLIER_MESSAGES, ERROR_TAX_MESSAGES } from '../../utils/errorsMessagesHandle.js'
import { SUCCESS_MESSAGES } from '../../utils/succesMessages.js'

const taxInformationService = new TaxInformationService()

export const findAllTaxInformation = catchAsync(async (req, res, next) => {

    const taxInformation = await taxInformationService.findAllTaxInfo()

    return res.status(200).json(taxInformation)
})

export const findOneTaxInformation = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const taxInformation = await taxInformationService.findOneTaxiInfo(id)

    if (!taxInformation) {
        next(new AppError(ERROR_TAX_MESSAGES.error_tax_not_found, 404))
    }

    return res.status(200).json({
        taxInformation
    })
})

export const createTaxiInformation = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, taxInfoData } = validateTaxInformation(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params;

    const supplier = supplierService.finOneSupplier(id)

    if (!supplier) {
        return next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_not_found, 404));
    }

    const existingCriteria = await TaxInformation.findOne({ where: { supplier_id: id } });

    if (existingCriteria) {
        return next(new AppError(ERROR_TAX_MESSAGES.error_tax_supplier_exist, 409));
    }

    const qualificationResults = await qualificationTaxResults(taxInfoData)

    taxInfoData.qualificationResults = qualificationResults;

    const taxInformation = await taxInformationService.createTaxInfo({ ...taxInfoData, supplier_id: id })

    await taxInformationService.updateTaxInfo(taxInformation)

    return res.status(201).json({
        ok: true,
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
        next(new AppError(ERROR_TAX_MESSAGES.error_tax_not_found), 404)
    }

    const qualificationResults = await qualificationTaxResults(taxInformation)

    taxInformation.qualificationResults = qualificationResults

    await taxInformationService.updateTaxInfo(taxInformation, taxInfoData)

    return res.status(200).json(SUCCESS_MESSAGES.success_tax_updated, {
        taxInformation,
        qualificationResults
    })
})

export const deleteTaxInfomation = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const taxInformation = await taxInformationService.findOneTaxiInfo(id)

    if (!taxInformation) {
        next(new AppError(ERROR_TAX_MESSAGES.error_tax_not_found))
    }

    await taxInformationService.deleteTaxInfo(taxInformation)

    res.status(200).json(SUCCESS_MESSAGES.success_tax_deleted)
})