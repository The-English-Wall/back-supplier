import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const hseqCriteriaSchema = z.object({
    hasQualityCertified: z.string().min(3).max(25),
    hasEnvironmentCertified: z.string().min(3).max(25),
    hasSafetyCertified: z.string().min(3).max(25),
    hasSstCertified: z.string().min(3).max(25),
    hasSupplyChainSafetyCertified: z.string().min(3).max(25),
    enterToFacilities: z.boolean(),
    workType: z.string().min(3).max(25),
    accidentRatio: z.number(),
    qualificationResults: z.number(),
    // supplierId: z.number().positive()
})

export const validateHseqCriteria = (data) => {
    const result = hseqCriteriaSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: hseqCriteriaData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        hseqCriteriaData
    }
}

export const validatePartialHseqCriteria = (data) => {
    const result = hseqCriteriaSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: hseqCriteriaData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        hseqCriteriaData
    }
}

