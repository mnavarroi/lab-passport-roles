const express = require ('express');
const router = express.Router();
const User = require ('../models/User');
const passport = require ('passport');

router.get('/register', (req,res) => {
    res.render('login', { isNewUser: true})
});
router.post('/register', (req,res) => {
    if(req.body.password !== req.body.confirmpassword) return res.render('login', {err: 'Las contraseñas no coinciden'});
    const {username, email, password} = req.body;
    User.register({username, email}, password)
        .then(user =>{
            res.json(user);
        })
});

router.get('/login', (req,res) => {
    res.render('login')
});

router.post('/login', passport.authenticate("local"), (req,res) => {
    res.redirect("/private")
});

router.post('/logout', (req,res) => {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;