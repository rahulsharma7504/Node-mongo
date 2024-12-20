const express = require('express');
const EJS = express();
const { body, validationResult } = require('express-validator')


const validationRules = [
    body('username').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
]


EJS.get('/', function (req, res) {
    const data = {
        name: 'John Doe',
        age: 30,
        email: 'johndoe@example.com',
        hobbies: ['reading', 'painting', 'cooking']
    }
    res.render('pages/index', { errors: [], formData: {}  });
});


EJS.get('/submit', function (req, res) {
    res.render('pages/submit');
});



EJS.post('/submit', validationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/index', { 
            errors: errors.array(), 
            formData: req.body // Pass the submitted form data back for repopulation
        });
    }
    const formData = req.body;
    console.log('Form data received:', formData);
    res.render('pages/submit', { formData });
});


module.exports = { EJS }
