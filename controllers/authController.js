const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('auth/register')
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (err) => {
            if (err) { return next(err) }
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        })
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('auth/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome back!')
    const returnUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(returnUrl)
}

module.exports.logoutUser = (req, res) => {
    req.logout()
    req.flash('success', 'Successfully logged you out!')
    res.redirect('/campgrounds')
}