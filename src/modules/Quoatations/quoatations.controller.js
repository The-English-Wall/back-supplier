import { catchAsync, AppError } from '../../errors/index.js'
import { QuoatationsService } from './quoatations.service.js'
import { validateQuoatations, validatePartialQuoatations } from './quoatations.schema.js'
import { ERROR_QUOATATIONS_MESSAGES } from '../../utils/errorsMessagesHandle.js'
import { SUCCESS_MESSAGES } from '../../utils/succesMessages.js'
import { supplierService } from '../Supplier/supplier.controller.js'
import { offersServive } from '../Offers/offers.controller.js'
import { sendMail } from '../../utils/nodemailes.js'

const quoatationsService = new QuoatationsService()

export const findAllQuoatations = catchAsync(async (req, res, next) => {

    const quoatations = await quoatationsService.findAllQuoatations()

    return res.status(200).json(quoatations)
})

export const findOneQuoatations = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const quoatations = await quoatationsService.findOneQuoatations(id)

    if (!quoatations) {
        next(new AppError(ERROR_QUOATATIONS_MESSAGES.error_quoatations_not_found, 404))
    }

    return res.status(200).json(quoatations)
})

export const findAllQuoatationsByOfferId = catchAsync(async (req, res, next) => {
    const id = req.body.offerId

    const quoatations = await quoatationsService.findAllQuoatationsByOffer(id)

    const findCheapestPrices = (quotations) => {
        let productMap = new Map();

        quotations.forEach(quote => {
            quote.productList.forEach(product => {
                if (!productMap.has(product.productName) || product.offeredPrice < productMap.get(product.productName).offered_price) {
                    productMap.set(product.productName, {
                        isCheapest: true,
                        offer_id: quote.offer_id,
                        product_name: product.productName,
                        offered_price: product.offeredPrice,
                        subTotalPrice: product.offeredPrice * product.quantity,
                        supplierName: quote.supplierName
                    });
                }
            });
        });

        return Array.from(productMap.values());
    }

    const quotationsComparation = findCheapestPrices(quoatations)

    return res.status(200).json({ quoatations, cheapestOffersByProducts: quotationsComparation })
})

export const createQuoatations = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, quoatationsData } = validateQuoatations(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params;

    const offerExist = await offersServive.findOneOffer(id)

    if (!offerExist) {
        return next(new AppError('El ID de la oferta no se ha encontrado'))
    }

    const supplierFoundAndActive = await supplierService.finOneSupplier(quoatationsData.supplierId)

    if (!supplierFoundAndActive) {
        return next(new AppError('Proveedor no encontrado o no activo'))
    }

    const quoatations = await quoatationsService.createQuoatations({ ...quoatationsData, offer_id: id })

    sendMail('Procure Pro <procurepro>', 'advbrrop23@gmail.com', `Respuesta a la oferta: ${id}`, `El proveedor ${quoatationsData.supplierName} ha cotizado la oferta numero ${id}`, null)

    return res.status(201).json(quoatations)
})

export const updateQuoatations = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, quoatationsData } = validatePartialQuoatations(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params;

    const quoatations = await quoatationsService.findOneQuoatations(id)

    if (!quoatations) {
        next(new AppError(ERROR_QUOATATIONS_MESSAGES.error_quoatations_not_found, 404))
    }

    const updatedQuoatations = await quoatationsService.updateQuoatations(quoatations, quoatationsData)

    return res.status(200).json(SUCCESS_MESSAGES.success_quoatations_updated, updatedQuoatations)
})

export const deleteQuoatations = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const quoatations = await quoatationsService.findOneQuoatations(id)

    if (!quoatations) {
        next(new AppError(ERROR_QUOATATIONS_MESSAGES.error_quoatations_not_found, 404))
    }

    await quoatationsService.deleteQuoatations(quoatations)

    res.status(200).json(SUCCESS_MESSAGES.success_quoatations_deleted)
})