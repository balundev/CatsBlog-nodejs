const Cats           = require("../models/cat"),
      Comment        = require("../models/comment"),
      middlewareObj = {};

middlewareObj.checkCommentOwner = (req,res,next)=>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err,foundComment)=>{
            if(err){
                res.redirect("back")
            } else{
                if(foundComment.author.id.equals(req.user.id)){
                    return next();
                }else{
                    res.redirect("/cats");
                    req.flash("error", "You are not comment owner");
                }
            }
        });
    }else {
        req.flash("error","Please login first");
        res.redirect("/login");
    }
};
middlewareObj.checkCatOwner = (req,res,next)=>{
    if(req.isAuthenticated()){
        Cats.findById(req.params.id, (err,foundCat)=>{
            if(err){
                res.redirect("back")
            } else{
                if(foundCat.author.id.equals(req.user.id)){
                    return next();
                }else{
                    req.flash("error","You are not the post owner");
                    res.redirect("/cats");
                }
            }
        });
    }else {
        res.redirect("/login");
    }
};
middlewareObj.isLogged = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first!");
    res.redirect("/login");
};


module.exports = middlewareObj;