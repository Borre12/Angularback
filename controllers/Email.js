const nodemailer = require('nodemailer');
module.exports = (forms) => {
    var transporter = nodemailer.createTransport({
        service: `gmail`,
        auth: {
            user: '4lltogether.1@gmail.com',
            pass: '1A2B3C4Tenz'
        }
    });
    const mailOptions = {
        from: `"${forms.name}" 👻 <${forms.email}>`,
        to: `4lltogether.1@gmail.com`,
        subject: forms.subject,
        html: `
 <strong>Nombre:</strong> ${forms.name} <br/>
 <strong>E-mail:</strong> ${forms.email} <br/>
 <strong>Mensaje:</strong> ${forms.message}
 `
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
