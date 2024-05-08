import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const safetyCriteriaSchema = z.object({
    hasSarlaftSystems: z.string().min(3).max(25),
    hasSagrilaftSystems: z.string().min(3).max(25),
    hasSiplaftSystems: z.string().min(3).max(25),
    hasOfacReport: z.boolean(),
    qualificationResults: z.number(),
    // supplierId: z.number().positive()
})

export const validateSafetyCriteria = (data) => {
    const result = safetyCriteriaSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: safetyCriteriaData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        safetyCriteriaData
    }
}

export const validatePartialSafetyCriteria = (data) => {
    const result = safetyCriteriaSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: safetyCriteriaData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        safetyCriteriaData
    }
}