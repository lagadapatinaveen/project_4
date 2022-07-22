const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const fs = require('fs');
const port = process.env.PORT || 8080
var nodemailer = require('nodemailer');


app.use(express.static('public'))

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/audio&videogallery.html', (req, res) => {
    res.sendFile(__dirname + '/public/audio&videogallery.html')
})

app.get('/class-sched.html', (req, res) => {
    res.sendFile(__dirname + '/public/class-sched.html')
})


app.get('/feedback.html', (req, res) => {
    res.sendFile(__dirname + '/public/feedback.html')
})

app.get('/send', (req, res) => {
    res.sendFile(__dirname + '/public/feedback.html')
})

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/', function (req, res) {
    res.render('form');
});

app.set('view engine', 'pug');
app.set('public', './public');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static('public'));


app.post('/send', function (req, res) {
    var jsonData = req.body;
    var jsonContent = JSON.stringify(jsonData);
    var ema = req.body.email;
    var first = req.body.firstname;
    var last = req.body.lastname;
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'naveen201699@gmail.com',
            pass: 'zjznrbggcdgpfwmg'
        }
    });

    var mailOptions = {
        from: 'naveen201699@gmail.com',
        to: ema,
        subject: 'Sending Email From naveen Blog',
        text: "Dear" + " " + first + " " + last + " " + ",Thank you for your feedback!"

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        fs.appendFile('public/output.json', jsonContent + "\n", 'utf8',
            function (err) {
                if (err) throw err;
                res.redirect("/index.html");
            });

    }); 

});

app.listen(port, () => console.info('Listening on port 8080'))