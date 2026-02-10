const User = require("../Models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signUp.ejs")
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username })
        const registerUser = await User.register(newUser, password);
        req.login(registerUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success", "welcome to Wanderlust")
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message)
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
        req.flash("success", "welcome back to WanderLust")
        let redirectUrl = res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl)
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you have been logged out")
        res.redirect("/listings");
    })
}
