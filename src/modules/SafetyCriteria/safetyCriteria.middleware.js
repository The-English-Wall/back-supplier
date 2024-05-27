import { AppError, catchAsync } from "../../errors/index.js";
import { ERROR_SAFETY_MESSAGES } from "../../utils/errorsMessagesHandle.js";
import { SafetyCriteriaService } from './safetyCriteria.service.js'

const safetyService = new SafetyCriteriaService()

export const validateExistSafety = catchAsync(async (req, res, next) => {

    const { id, safetyId } = req.params;

    const safety = await safetyService.findOneSafety(id, safetyId)

    if (!safety) {
        next(new AppError(ERROR_SAFETY_MESSAGES.error_safety_not_found, 404))
    }

    req.safety = safety;
    next()
})