import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const comercialCriteriaSchema = z.object({
    isServiceSupplier: z.boolean(),
    experienceYears: z.number().positive(),
    hasPostSaleService: z.boolean(),
    hasTrainingService: z.boolean(),
    hasReturnPolicy: z.boolean(),
    hasWarranty: z.boolean(),
    deliveryAverageDays: z.number().positive(),
    qualificationResults: z.number(),
})

export const validateComercialCriteria = (data) => {
    const result = comercialCriteriaSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: comercialCriteriaData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        comercialCriteriaData
    }
}

export const validatePartialComercialCriteria = (data) => {
    const result = comercialCriteriaSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: comercialCriteriaData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        comercialCriteriaData
    }
}