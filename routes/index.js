const express   = require("express"),
      router    = express.Router(),
      passport  = require("passport"),
      User      = require("../models/user");


/// landing and login routes
router.get('/', (req, res) => {
    res.render("landing")
});

/// register routes
router.get("/register", (req,res)=>{
    res.render("register")
});
router.post("/register", (req,res)=>{
    if(req.body.password === req.body.passwordRepeat){
    User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
        if(err){
            req.flash("error", `${err.message}`);
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,()=>{
                req.flash("success","Welcome to CAT WORLD!!!!!");
                res.redirect("/cats")
            })
        }
    })}else{
        req.flash("error","Passwords are not the same");
        res.redirect("/register");
    }
});
// login form
router.get("/login",(req,res)=>{
    res.render("login")
});
// login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/cats",
        failureRedirect: "/login"
    }),(req,res)=>{
});
// logout logic
router.get("/logout", (req,res)=>{
    req.logout();
    req.flash("success","Logged out");
    res.redirect("/cats")
});

module.exports = router;