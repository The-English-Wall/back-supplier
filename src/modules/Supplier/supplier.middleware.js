import { AppError, catchAsync } from '../../errors/index.js'
import { SupplierService } from './supplier.service.js'

const supplierService = new SupplierService()

export const validateExistSupplier = catchAsync(async (req, res, next) => {

    const { id, supplierId } = req.params

    const supplier = await supplierService.finOneSupplier(id, supplierId)

    if (!supplier) {
        next(new AppError(`Supplier whit id ${id} not found`, 404))
    }

    req.supplier = supplier;
    next()
})