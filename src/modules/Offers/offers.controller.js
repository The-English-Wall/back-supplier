import { catchAsync, AppError } from '../../errors/index.js'
import { OffersService } from './offers.service.js'
import { validateOffers, validatePartialOffers } from './offers.schema.js'
import { ERROR_OFFERS_MESSAGES } from '../../utils/errorsMessagesHandle.js'
import { SUCCESS_MESSAGES } from '../../utils/succesMessages.js'
import { message } from '../../utils/emailMessages/emailMessages.js'
import { sendMail } from '../../utils/nodemailes.js'
import moment from 'moment'

export const offersServive = new OffersService()

export const findAllOffers = catchAsync(async (req, res, next) => {
    const offers = await offersServive.findAllOffers()

    return res.status(200).json(offers)
})

export const findOneOffer = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const offer = await offersServive.findOneOffer(id)

    if (!offer) {
        next(new AppError(ERROR_OFFERS_MESSAGES.error_offer_not_found, 404))
    }

    return res.status(200).json(offer)
})

export const createOffer = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, offersData } = validateOffers(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    if (offersData.supplierList.length === 0) {
        return next(new AppError(ERROR_OFFERS_MESSAGES.error_offers_supplier_list_empty, 406))
    }

    if (offersData.productList.length === 0) {
        return next(new AppError(ERROR_OFFERS_MESSAGES.error_offers_list_products_empty, 406))
    }

    const limitOffersDate = moment(offersData.limitOfferDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    const deliveryDate = moment(offersData.deliveryDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    const isToday = moment().format("DD/MM/YYYY")

    const resultDate = limitOffersDate > isToday

    if (resultDate) {
        return next(new AppError('La fecha limite para ofertar ha expirado'))
    }

    const offer = await offersServive.createOffer(offersData)

    const emailList = offersData.supplierList.map(e => e.email)

    if (offer) {
        sendMail('Procure Pro <procurepro>', emailList, 'Invitación Oferta', null, message('Proveedor', 'www.google.com', 'Procure Pro'))
    }

    return res.status(201).json(offer)
})

export const updateOffer = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, offersData } = validatePartialOffers(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params;

    const offer = await offersServive.findOneOffer(id)

    if (!offer) {
        next(new AppError(ERROR_OFFERS_MESSAGES.error_offer_not_found, 404))
    }

    const updatedOffer = await offersServive.updateOffer(offer, offersData)

    return res.status(200).json(SUCCESS_MESSAGES.success_offer_updated, updatedOffer)
})

export const deleteOffer = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const offer = await offersServive.findOneOffer(id)

    if (!offer) {
        next(new AppError(ERROR_OFFERS_MESSAGES.error_offer_not_found, 404))
    }

    await offersServive.deleteOffer(offer)

    res.status(200).json(SUCCESS_MESSAGES.success_offer_deleted)
})