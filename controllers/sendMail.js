const nodemailer = require("nodemailer");
const {validEmailIDs} = require('./mailValidator')
// require('dotenv').config()
const config = require('./config')

const sendMail = async (req, res) => {

    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                // Here you should add ur own username and password where username is ur email id 
                // and password is the main password of ur email id which you use to login into ur email service
                // gmail, yahoo, etc
                user: config.email.username,
                pass: config.email.password
            }
        })
        
        const senderDetails = {
            from: req.body.from,
            to: validEmailIDs,
            subject: req.body.subject,
            text: req.body.content
        }

        const info = await transporter.sendMail(senderDetails)
    }
    catch(err) {
        console.log(err);
        res.status(404).send({msg:err})
    }
}


module.exports = sendMail