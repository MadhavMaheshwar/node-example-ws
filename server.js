
const fs = require('fs'); 

const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app =  express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/html'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('log.txt', `${log}\n`, function(err) { if(err) console.log('Error: Unable to write file.'); });
    
    // res.render('about.hbs', {
    //     pageTitle: 'Maintenance',
    //     title: 'At Work!',
    //     message: 'Currently under maintenance. Please check-in later.'
    // });
    next();
});


hbs.registerHelper('getYear', () => new Date().getFullYear());

hbs.registerHelper('caps', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    // res.send('<h2>Hello Express!</h2>');
    res.render('home.hbs', {
        pageTitle: 'Home',
        title: 'Welcome Home!',
        message: 'Welcome to Madhav\'s crib'
    });


    // res.send({
    //     name: 'Madhav',
    //     likes: [
    //         'Rasgulla',
    //         'Paav bhaji'
    //     ]
    // });
});


app.get('/about', (req, res) => {
    // res.send('About Page!');
    res.render('home.hbs', {
        pageTitle: 'About Me',
        title: 'About the Author',
        message: 'I\'m just learning to code'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Service Unavailable'
    });
    // res.render('about.hbs', {
    //     pageTitle: 'Bad'    });
});




app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});