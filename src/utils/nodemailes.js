import nodemailer from 'nodemailer';
import { envs } from '../config/enviroments/enviroments.js';

const { HOST_MAIL_PROCURE, USERMAIL_PROCURE, PASS_APP } = envs

const createTransport = (host, user, pass) => {
    const transporter = nodemailer.createTransport({
        host: host, // es el valor de host en envs
        port: 465, //Puerto por defecto de los emails
        secure: true, //si quiero cambiar el puerto el valor es false
        auth: {
            user,
            pass
        }
    })
    return transporter
}

export const sendMail = async (from, emailList, subject, plainText, body) => {
    const transporter = createTransport(HOST_MAIL_PROCURE, USERMAIL_PROCURE, PASS_APP)

    try {
        const info = await transporter.sendMail({
            from: from, // sender address
            to: emailList, // list of receivers
            subject: subject, // Subject line
            text: plainText, // plain text body
            html: body, // html body
        });
        console.log("Message sent: ", info.messageId);
        return info.messageId
    } catch (error) {
        console.log('error: ', error + error.message)
        return error
    }

}

// sendMail('Opinno <opinno>', 'advbrrop23@gmail.com', 'Invitación Oferta', 'Ha sido invitado a participar en una oferta, dale click aca https://kiwiapp.starsdev.online/', message('Ramiro', "https://kiwiapp.starsdev.online/", "Opinno"))