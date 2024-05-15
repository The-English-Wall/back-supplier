import { AppError, catchAsync } from "../../errors/index.js";
import { SafetyCriteriaService } from './safetyCriteria.service.js'

const safetyService = new SafetyCriteriaService()

export const validateExistSafety = catchAsync(async (req, res, next) => {

    const { id, safetyId } = req.params;

    const safety = await safetyService.findOneSafety(id, safetyId)

    if (!safety) {
        next(new AppError(`Safety criteria whit id ${id} not found`, 404))
    }

    req.safety = safety;
    next()
})