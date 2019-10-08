const nodeMailer = require('nodemailer')

module.exports = async ({ user,pass,from,to,subject,text }) =>
{
    const transporter = nodeMailer.createTransport(
    {
        service: 'gmail',
        auth:
        {
            user,
            pass
        }
    })

    const mailOptions =
    {
        from,
        to,
        subject,
        text
    }

    return transporter.sendMail(mailOptions)
}
