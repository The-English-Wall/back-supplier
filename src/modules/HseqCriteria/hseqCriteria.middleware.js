import { AppError, catchAsync } from "../../errors/index.js";
import { HseqCriteriaService } from './hseqCriteria.service.js'

const hseqService = new HseqCriteriaService()

export const validateExistHseqCriteria = catchAsync(async (req, res, next) => {

    const { id, hseqId } = req.params;

    const hseqCriteria = hseqService.findOneHseq(id, hseqId)

    if (!hseqCriteria) {
        next(new AppError(`Hseq Criteria whit id ${id} not found`, 404))
    }

    req.hseqCriteria = hseqCriteria;
    next()
})