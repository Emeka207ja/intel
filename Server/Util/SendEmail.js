import nodemailer from 'nodemailer'

const sendEmail = (options) => {
     console.log(options)
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.to,
        subject: options.subject,
        html:options.text
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        }else{console.log(info)}
    })
}
export default sendEmail