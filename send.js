var nodemailer = require('nodemailer')
var people = require('./people')
var fs = require('fs')
var config = require('./config.js')

let smtpConfig = {
    service: 'gmail',
    auth: {
        user: config.user,
        pass: config.password
    }
};

let transporter = nodemailer.createTransport(smtpConfig)

const sendMail = (message) => {
    // verify connection configuration
    return transporter.verify()
        .then(err => {
            console.log('Server is ready to take our messages');
            return transporter.sendMail(message)
                .then(() => {
                    console.log(`Success with ${message.to}`)
                    return true
                }).catch(err => console.error(`Error with ${message.to}`))
        })
}

fs.readFile('message.txt', 'utf8', function(err, data) {
  if (err) throw err;
  let promises = people.map(function(person) {
    const message = {
        from: 'Alon Gal <alongalky@gmail.com>',
        to: person.mail,
        subject: 'Advice on a technical initiative in scientific computing',
        text: data.replace('{name}', person.name)
    }
    return () => sendMail(message)
  })

  const promise = promises.reduce((prev, cur) => prev.then(cur), Promise.resolve());

  promise.then(() => console.log('Done!')).catch(e => console.error('Crap!', e))
})