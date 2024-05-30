import z, { object } from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const offersSchema = z.object({
    supplierList: z.array(object({
        id: z.number(),
        supplierName: z.string().min(3).max(32),
        email: z.string().email('El formato del Email no es correcto'),
        taxId: z.string(),
        contactName: z.string().min(3).max(56)
    })),
    limitOfferDate: z.string().min(3).max(12),
    deliveryDate: z.string().min(3).max(12),
    paymentTime: z.number().positive().optional(),
    deliveryPlace: z.string().min(3).max(35).optional(),
    currency: z.string().min(3).max(35),
    comments: z.string().min(3).max(80).optional(),
    productList: z.array(object({
        productName: z.string().min(3).max(56),
        reference: z.string().min(3).max(16),
        brand: z.string().min(3).max(32),
        quantity: z.number().positive(),
        suggestedPrice: z.number().positive()
    })),
    companyId: z.number().positive(),
    statusOpen: z.array(z.enum(['open', 'pending', 'complete'])).nonempty().optional()
})

export const validateOffers = (data) => {
    const result = offersSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: offersData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        offersData
    }
}

export const validatePartialOffers = (data) => {
    const result = offersSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: offersData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        offersData
    }
}