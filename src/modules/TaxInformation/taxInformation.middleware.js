import { AppError, catchAsync } from '../../errors/index.js'
import { TaxInformationService } from './taxInformation.service.js'

const taxService = new TaxInformationService()

export const validateExistTaxInformation = catchAsync(async (req, res, next) => {

    const { id, taxId } = req.params;

    const taxInfo = await taxService.findOneTaxiInfo(id, taxId)

    if (!taxInfo) {
        next(new AppError(`Tax Information whit id ${id} not found`, 404))
    }

    req.taxInfo = taxInfo
    next()
})