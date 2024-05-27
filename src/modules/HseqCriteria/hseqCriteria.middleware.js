import { AppError, catchAsync } from "../../errors/index.js";
import { HseqCriteriaService } from './hseqCriteria.service.js'

const hseqService = new HseqCriteriaService()

export const validateExistHseqCriteria = catchAsync(async (req, res, next) => {

    const { id, hseqId } = req.params;

    const hseqCriteria = hseqService.findOneHseq(id, hseqId)

    if (!hseqCriteria) {
        next(new AppError(ERROR_HSEQ_MESSAGES.error_comercial_not_found, 404))
    }

    req.hseqCriteria = hseqCriteria;
    next()
})