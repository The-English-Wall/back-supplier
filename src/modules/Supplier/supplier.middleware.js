import { AppError, catchAsync } from '../../errors/index.js'
import { SupplierService } from './supplier.service.js'
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { envs } from '../../config/enviroments/enviroments.js';

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

export const protect = catchAsync(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        next(new AppError('You are not logged in! Please log in to get access', 401));
    }

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWD_SEED
    );

    if (decoded.id && decoded.exp > 0) {
        req.token = token
        next()
    } else {
        next(new AppError('Unauthorization', 401))
    }
});
