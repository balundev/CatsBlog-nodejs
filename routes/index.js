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
    User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/cats")
            })
        }
    })
});
router.get("/login",(req,res)=>{
    res.render("login")
});
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/cats",
        failureRedirect: "/login"
    }),(req,res)=>{
});
router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/cats")
});

module.exports = router;