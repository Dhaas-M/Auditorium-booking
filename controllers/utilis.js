
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'testu4115@gmail.com',
        pass: 'testingdhaas'
    },
    tls:{
        rejectUnauthorized: false
    }
})

exports.sendMail = (req,res,email,emailToken) => {
    var mailOptions = {
        from: ' "verify" <testu4115@gmail.com>',
        to: email,
        subject: 'hello',
        html:`<a herf="http://${req.headers.host}/verify?token=${emailToken}"`
    }
    
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        } else{
            console.log('verified')
        }
    })
}

exports.sendConfirmation = (url,email) => {
    var mailOptions = {
        from: ' "verify" <testu4115@gmail.com>',
        to: email,
        subject: 'your Booking confirmed ',
        html:` <img src="<%= ${url} %>" alt="">`
    }

    
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        } else{
            console.log('booking send')
        }
    })
}

