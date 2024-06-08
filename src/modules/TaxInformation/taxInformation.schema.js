import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const taxInformationSchema = z.object({
    nonProfitResolution: z.boolean(),
    nonProfitDate: z.string({
        invalid_type_error: '¡Non Profit Date must be a correct format!',
        required_error: 'Non profit Date is required'
    }),
    majorTaxPayer: z.boolean(),
    majorTaxdate: z.string({
        invalid_type_error: '¡Major Tax Date must be a correct format!',
        required_error: 'Major Tax Date is required'
    }),
    regimeType: z.string().min(3).max(30),
    currentAssets: z.number(),
    currentLiabilities: z.number(),
    inventories: z.number(),
    financialObligations: z.number(),
    netWorth: z.number(),
    qualificationResults: z.number().optional(),
    taxInformationIsAvailable: z.boolean(),
})

export const validateTaxInformation = (data) => {
    const result = taxInformationSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: taxInfoData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        taxInfoData
    }
}

export const validatePartialTaxInformation = (data) => {
    const result = taxInformationSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: taxInfoData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        taxInfoData
    }
}