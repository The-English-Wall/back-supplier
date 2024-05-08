import { AppError, catchAsync } from '../../errors/index.js'
import { validateSupplier, validatePartialSupplier } from './supplier.schema.js'
import { SupplierService } from './supplier.service.js'

const supplierService = new SupplierService()

export const findAllSupplier = catchAsync(async (req, res, next) => {

    const supplier = await supplierService.findAllSupplier()

    return res.status(200).json(supplier)
})

export const findOneSupplier = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        next(new AppError(`Supplier whit id ${id} not found`))
    }

    return res.json(supplier)
})

export const createSupplier = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, supplierData } = validateSupplier(req.body)

    if (hasError) {
        return res.satus(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const supplier = await supplierService.createSupplier(supplierData)

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
        next(new AppError(`Supplier whit id ${id} not found`))
    }

    const updateSupplier = await supplierService.updateSupplier(supplier, supplierData)

    return res.status(200).json(updateSupplier)
})

export const deleteSupplier = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const supplier = await supplierService.finOneSupplier(id)

    if (!supplier) {
        next(new AppError(`Supplier whit id ${id} not found`))
    }

    await supplierService.deleteOrganization(supplier)

    return res.satus(200).json({
        status: 'Succes',
        message: 'Supplier deleted successfully'
    })
})