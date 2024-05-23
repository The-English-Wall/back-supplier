import { AppError, catchAsync } from '../../errors/index.js'
import { validateSupplier, validatePartialSupplier } from './supplier.schema.js'
import { SupplierService } from './supplier.service.js'
import { BASE_URL_COMPANY } from '../../config/conections/axios.config.js'

export const supplierService = new SupplierService()

export const findAllSupplier = catchAsync(async (req, res, next) => {

    const supplier = await supplierService.findAllSupplier()

    return res.status(200).json(supplier)
})

export const findOneSupplier = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        next(new AppError(`Supplier whit id ${id} not found`, 404))
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
        next(new AppError('A supplier with this taxId already exists', 400))
    }

    const supplier = await supplierService.createSupplier(supplierData)

    let company
    try {
        const { data } = await BASE_URL_COMPANY.get(`/company/${supplierData.companyId}`)
        company = data
    } catch (error) {
        return next(new AppError('Failed to fetch company data: ' + error.message, 500))
    }

    const supplierPayload = {
        id: supplier.id,
        name: supplier.name
    }

    company.supplierList === null ? [] : company.supplierList
    company.supplierList.push(supplierPayload)

    try {
        await BASE_URL_COMPANY.patch(`/company/${supplierData.companyId}/supplier-list`, {
            supplierList: company.supplierList
        })
    } catch (error) {
        return next(new AppError('Failed to update company with new supplier' + error.message))
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
        next(new AppError(`Supplier whit id ${id} not found`, 404))
    }

    const updateSupplier = await supplierService.updateSupplier(supplier, supplierData)

    return res.status(200).json({
        updateSupplier
    })
})


export const deleteSupplier = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        return next(new AppError(`Supplier with id ${id} not found`, 404))
    }

    const companyId = supplier.companyId

    let company
    try {
        const { data } = await BASE_URL_COMPANY.get(`/company/${companyId}`)
        company = data
    } catch (error) {
        return next(new AppError('Failed to fetch company data: ' + error.message, 500))
    }

    if (!company || !Array.isArray(company.supplierList)) {
        return next(new AppError(`Company with id ${companyId} has an invalid supplier list`, 500))
    }

    const updatedSupplierList = company.supplierList.filter(supplier => supplier.id !== parseInt(id))

    try {
        await BASE_URL_COMPANY.patch(`/company/${companyId}/supplier-list`, {
            supplierList: updatedSupplierList
        })
    } catch (error) {
        return next(new AppError('Failed to update company with new supplier list: ' + error.message, 500))
    }

    await supplierService.deleteSupplier(supplier)

    return res.status(200).json({
        message: 'Supplier deleted successfully'
    })
})
