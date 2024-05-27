import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const supplierSchema = z.object({
    contactName: z.string().min(2).max(25),
    type: z.string().min(3).max(60),
    idType: z.string().min(3).max(60),
    address: z.string().min(3).max(50),
    codeArea: z.string().min(2).max(8),
    phone: z.string().min(3).max(25),
    email: z.string().email({ message: 'Invalid email type' }),
    country: z.string().min(3).max(20),
    department: z.string().min(3).max(20),
    city: z.string().min(3).max(20),
    supplierName: z.string().min(3).max(40),
    legalType: z.string().min(3).max(20),
    legalManagerName: z.string().min(3).max(25),
    legalManagerId: z.string().min(3).max(25),
    legalManagerEmail: z.string().email({ message: 'Invalid email type' }),
    categoryGroup: z.string().min(3).max(60),
    categoryFamily: z.string().min(3).max(60),
    categoryLine: z.string().min(3).max(60),
    taxId: z.string(),
    companyId: z.number().positive()
})

export const validateSupplier = (data) => {
    const result = supplierSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: supplierData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        supplierData
    }
}

export const validatePartialSupplier = (data) => {
    const result = supplierSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: supplierData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        supplierData
    }
}