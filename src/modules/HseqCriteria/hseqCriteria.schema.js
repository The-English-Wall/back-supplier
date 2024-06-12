import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const hseqCriteriaSchema = z.object({
    hasQualityCertified: z.object({
        status: z.boolean(),
        certify: z.string().nullable()
    }),
    hasEnvironmentCertified: z.object({
        status: z.boolean(),
        certify: z.string().nullable()
    }),
    hasSafetyCertified: z.object({
        status: z.boolean(),
        certify: z.string().nullable()
    }),
    hasSstCertified: z.object({
        status: z.boolean(),
        certify: z.string().nullable()
    }),
    hasSupplyChainSafetyCertified: z.object({
        status: z.boolean(),
        certify: z.string().nullable()
    }),
    enterToFacilities: z.boolean(),
    workType: z.string().min(3).max(25),
    accidentRatio: z.number(),
    qualificationResults: z.number().optional(),
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

