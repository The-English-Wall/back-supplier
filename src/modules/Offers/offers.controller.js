import { catchAsync, AppError } from '../../errors/index.js'
import { OffersService } from './offers.service.js'
import { validateOffers, validatePartialOffers } from './offers.schema.js'
import { ERROR_OFFERS_MESSAGES } from '../../utils/errorsMessagesHandle.js'
import { SUCCESS_MESSAGES } from '../../utils/succesMessages.js'
import { message } from '../../utils/emailMessages/emailMessages.js'
import { sendMail } from '../../utils/nodemailes.js'
import moment from 'moment'
import { BASE_URL_COMPANY, BASE_URL_USER } from '../../config/conections/axios.config.js'
import { envs } from '../../config/enviroments/enviroments.js'

export const offersServive = new OffersService()

// POR HACER:  este controller solo utilizara para los usuario de tipo "EMPLOYEE"
export const findAllOffers = catchAsync(async (req, res, next) => {
    const offers = await offersServive.findAllOffers()
    return res.status(200).json(offers)
})


// Escenario usuario tipo CUSTOMER: este controller permite traer todas las ofertas creadas con 
// cualquier usuario que tenga el mismo organizationId, esta funcion solo aplica para la organizacion principa PROVEECONSUL
// se debe pasar por params el organizationTaxId que tiene el usuario registrado en su tabla
export const findAllOffersByTaxId = catchAsync(async (req, res, next) => {
    const offers = await offersServive.findAllOffersByTaxId(req.params.id)
    if(offers.length === 0) {
        return next(new AppError('No existen ofertas creadas por el momento', 404))    
    }
    return res.status(200).json(offers)
})

// Escenario usuario tipo SUPPLIER: Este controller permite ver todas las ofertas a las que fue invitado
// el proveedor, se debe pasar el id de la organizacion principal y por params se debe pasar el ID del usuario que esta consultando
export const findAllInvitationOffers = catchAsync(async (req, res, next) => {
    try {
        const offers = await offersServive.findAllOffersByCompanyId(envs.PRINCIPAL_ORGANIZATION)
        const {data} = await BASE_URL_USER.get(`users/${req.params.id}`)
        let offerList = []
        if(data.userType !== "supplier") {
            return next(new AppError('No es un usuario de tipo proveedor, no tiene invitaciones de ofertas', 404)) 
        }
        offers.forEach(offer => {
            offer.supplierList.forEach(supplier => {
                if(supplier.taxId === data.organizationTaxId) {
                    offerList.push(offer)
                }
            })
        })
        return res.status(200).json(offerList)
    } catch (error) {
        console.log('error', error)
        return next(new AppError(error.message, 404))
    }
})

// Escenario usuario tipo CUSTOMER: Este controller permite traer todas las ofertas que hayan sido creado por el usuairo logueado
// se debe enviar por params el id del usuario logueado
export const findAllOffersByUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    try {
        const {data} = await BASE_URL_USER.get(`users/${id}`)
        if(!data) {
            return next(new AppError('No existen ofertas creada por este usuario', 404))    
        }
        const offers = await offersServive.findOneOfferByUserId(id)    
        return res.status(200).json(offers)
    } catch (error) {
        console.log('error: ', error)
    }
})


//POR HACER: si el usuario es tipo CUSTOMER, solo puede encontrar una oferta donde el user.companyId === PRINCIPAL_ORGNAIZATION && user.organizationTaxId === offer.organizationId
// si el usuario es tipo EMPLOYE, solo puede encontrar una oferta donde el user.companyId !== PRINCIPAL_ORGNAIZATION && user.companyId === offer.oganizationId
// Si el usuario es tipo SUPPLIER, solo puede encontrar una oferta donde 
// el user.companyId !== PRINCIPAL_ORGNAIZATION && offers.map(o => o.supplierlist.filter(s => s.taxId === user.organizationTaxId))
export const findOneOffer = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const offer = await offersServive.findOneOffer(id)

    if (!offer) {
        next(new AppError(ERROR_OFFERS_MESSAGES.error_offer_not_found, 404))
    }

    return res.status(200).json(offer)
})

// este controller tiene esta funcionalidad nueva: un usuario tipo SUPPLIER, no puede crear ofertas
// si el usuario es tipo EMPLOYEE, el campo organizationTaxId se setea en null, si es tipo CUSTOMER, se setea el taxId que viene por body
// el usuario tipo EMPLOYEE, no puede crear ofertas en la COMPANY PRINCIPAL
// el usuario tipo CUSTOMER, no puede crear ofertas fuera de COMPANY PRINCIPAL
export const createOffer = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, offersData } = validateOffers(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    try {
        const {data} = await BASE_URL_USER.get(`users/${offersData.userId}`)
        if(!data) {
            return next(new AppError('No existe este usuario', 404))    
        }
        if(data.userType === "supplier" ) {
            return next(new AppError('Eres usuario tipo proveedor, no puedes crear ofertas', 404))    
        }
        
        if(data.userType === "employee" && offersData.companyId === envs.PRINCIPAL_ORGANIZATION) {
            return next(new AppError("No tienes acceso a crear oferta en una organizacion que no te corresponde", 406))
        }

        if(data.userType === "customer" && offersData.companyId !== envs.PRINCIPAL_ORGANIZATION) {
            return next(new AppError("No tienes acceso a crear oferta en una organizacion que no te corresponde", 406))
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
    
        const offer = await offersServive.createOffer({...offersData, organizationTaxId: data.userType === "employee" ? null : offersData.organizationTaxId})
    
        const emailList = offersData.supplierList.map(e => e.email)
    
        if (offer) {
            sendMail('Procure Pro <procurepro>', emailList, 'Invitación Oferta', null, message('Proveedor', 'www.google.com', 'Procure Pro'))
        }
    
        return res.status(201).json(offer)
    } catch (error) {
        console.log('error: ', error)
    }

})

// POR HACER: solo pueden actualizar los usuario tipo EMPLOYEE en cualuqier oferta que no sea de la COMPANY PRINCIPAL
// y los usuarios tipo CUSTOMER, solo pueden actualizar las ofertas creadas por ellos mismos, asi que se debe validar que el userId que esta
// en la oferta, sea el mismo que esta logueado
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


// POR HACER: solo pueden borrar los usuario tipo EMPLOYEE en cualuqier oferta que no sea de la COMPANY PRINCIPAL
// y los usuarios tipo CUSTOMER, solo pueden borrar las ofertas creadas por ellos mismos, asi que se debe validar que el userId que esta
// en la oferta, sea el mismo que esta logueado
export const deleteOffer = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const offer = await offersServive.findOneOffer(id)

    if (!offer) {
        next(new AppError(ERROR_OFFERS_MESSAGES.error_offer_not_found, 404))
    }

    await offersServive.deleteOffer(offer)

    res.status(200).json(SUCCESS_MESSAGES.success_offer_deleted)
})