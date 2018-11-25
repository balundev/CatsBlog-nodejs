const express = require("express"),
      router  = express.Router({mergeParams: true}),
      Cats    = require("../models/cat"),
      Comment = require("../models/comment");
/// comments routes
let isLogged = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};

router.get('/new',isLogged, (req, res)=>{
    Cats.findById(req.params.id, (err,cat)=>{
        if(err){
            console.log(err)
        }else {
            res.render("comments/new",{cat: cat})
        }
    });
});

router.post('/', isLogged,(req, res)=>{
    Cats.findById(req.params.id, (err,cat)=>{
        if(err){
            console.log(err);
            res.redirect("/cats");
        }else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){console.log(err);
                }else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    cat.comments.push(comment);
                    console.log(comment);
                    cat.save();
                    res.redirect(`/cats/${cat.id}`)
                }
            })
        }
    })
});

module.exports = router;