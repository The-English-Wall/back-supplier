import axios from 'axios'
import { AppError, catchAsync } from '../../errors/index.js'
import { validateSupplier, validatePartialSupplier } from './supplier.schema.js'
import { SupplierService } from './supplier.service.js'
import { BASE_URL_COMPANY } from '../../config/conections/axios.config.js'

const BASE_URL = 'http://localhost:3000/api/v1'

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

    const supplier = await supplierService.createSupplier(supplierData)

    const supplierPayload = {
        id: supplier.id,
        name: supplier.name
    }

    try {
        await BASE_URL_COMPANY.patch(`/company/${supplierData.companyId}/supplier-list`, {
            supplierList: [supplierPayload]
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
    const { id } = req.params;

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        next(new AppError(`Supplier whit id ${id} not found`, 404))
    }

    await supplierService.deleteOrganization(supplier)

    return res.status(200).json({
        message: 'Supplier deleted successfully'
    })
})