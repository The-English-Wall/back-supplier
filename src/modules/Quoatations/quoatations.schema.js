import z, { object } from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const quotationsSchema = z.object({
    supplierId: z.number().positive(),
    supplierName: z.string(),
    taxId: z.string(),
    contactName: z.string(),
    deliveryDate: z.string(),
    paymentTime: z.string(),
    deliveryPlace: z.string(),
    currency: z.string(),
    discount: z.number().optional(),
    comments: z.string().optional(),
    statusOpen: z.array(z.enum(['created', 'closed'])).nonempty().optional(),
    productList: z.array(object({
        productName: z.string(),
        reference: z.string(),
        brand: z.string(),
        quantity: z.number(),
        suggestedPrice: z.number(),
        offeredPrice: z.number(),
        iva: z.number().positive(),
        subTotal: z.number()
    }))
})

export const validateQuoatations = (data) => {
    const result = quotationsSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: quoatationsData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        quoatationsData
    }
}

export const validatePartialQuoatations = (data) => {
    const result = quotationsSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: quoatationsData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        quoatationsData
    }
}