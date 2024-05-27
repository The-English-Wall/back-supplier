import { AppError, catchAsync } from '../../errors/index.js'
import { ERROR_COMERCIAL_MESSAGES } from '../../utils/errorsMessagesHandle.js';
import { ComercialCriteriaService } from './comercialCriteria.service.js'

const comercialService = new ComercialCriteriaService()

export const validateExistComercial = catchAsync(async (req, res, next) => {

    const { id, comercialId } = req.params;

    const comercialCriteria = await comercialService.findOneCriteria(id, comercialId)

    if (!comercialCriteria) {
        next(new AppError(ERROR_COMERCIAL_MESSAGES.error_comercial_not_found, 404))
    }

    req.comercialCriteria = comercialCriteria
    next()
})