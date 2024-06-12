import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const safetyCriteriaSchema = z.object({
    hasSarlaftSystems: z.object({
        notApplicable: z.boolean(),
        hasSystem: z.boolean() 
    }),
    hasSagrilaftSystems: z.object({
        notApplicable: z.boolean(),
        hasSystem: z.boolean() 
    }),
    hasSiplaftSystems: z.object({
        notApplicable: z.boolean(),
        hasSystem: z.boolean() 
    }),
    hasOfacReport: z.boolean(),
    qualificationResults: z.number().optional(),
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