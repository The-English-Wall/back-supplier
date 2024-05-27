import { AppError, catchAsync } from '../../errors/index.js'
import { validateSupplier, validatePartialSupplier } from './supplier.schema.js'
import { SupplierService } from './supplier.service.js'
import { BASE_URL_COMPANY } from '../../config/conections/axios.config.js'
import { ERROR_SUPPLIER_MESSAGES } from '../../utils/errorsMessagesHandle.js'
import { SUCCESS_MESSAGES } from '../../utils/succesMessages.js'

export const supplierService = new SupplierService()

export const findAllSupplier = catchAsync(async (req, res, next) => {

    const supplier = await supplierService.findAllSupplier()

    return res.status(200).json(supplier)
})

export const findOneSupplier = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_not_found, 404))
    }

    return res.status(200).json(supplier)
})

export const createSupplier = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, supplierData } = validateSupplier(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const existingSupplier = await supplierService.findSupplierByTaxId(supplierData.taxId)

    if (existingSupplier) {
        next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_taxid, 400))
    }

    const supplier = await supplierService.createSupplier(supplierData)

    let company
    try {
        const { data } = await BASE_URL_COMPANY.get(`/company/${supplierData.companyId}`)
        company = data
    } catch (error) {
        return next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_fetch_company + error.message, 500))
    }

    const supplierPayload = {
        id: supplier.id,
        supplierName: supplier.supplierName
    }

    company.supplierList = company.supplierList === null ? [] : company.supplierList
    company.supplierList.push(supplierPayload)

    try {
        await BASE_URL_COMPANY.patch(`/company/${supplierData.companyId}/supplier-list`, {
            supplierList: company.supplierList
        })
    } catch (error) {
        return next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_updated_company + error.message))
    }

    res.status(201).json(supplier)
})

export const updateSupplier = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, supplierData } = validatePartialSupplier(req.body)

    if (hasError) {
        return res.satus(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_not_found, 404))
    }

    const updateSupplier = await supplierService.updateSupplier(supplier, supplierData)

    return res.status(200).json(SUCCESS_MESSAGES.success_supplier_updated, updateSupplier)
})


export const deleteSupplier = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        return next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_not_found, 404))
    }

    const companyId = supplier.companyId

    let company
    try {
        const { data } = await BASE_URL_COMPANY.get(`/company/${companyId}`)
        company = data
    } catch (error) {
        return next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_fetch_company + error.message, 500))
    }

    if (!company || !Array.isArray(company.supplierList)) {
        return next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_invalid_supplierList, 500))
    }

    const updatedSupplierList = company.supplierList.filter(supplier => supplier.id !== parseInt(id))

    try {
        await BASE_URL_COMPANY.patch(`/company/${companyId}/supplier-list`, {
            supplierList: updatedSupplierList
        })
    } catch (error) {
        return next(new AppError(ERROR_SUPPLIER_MESSAGES.error_supplier_updated_company + error.message, 500))
    }

    await supplierService.deleteSupplier(supplier)

    return res.status(200).json(SUCCESS_MESSAGES.success_supplier_deleted)
})
