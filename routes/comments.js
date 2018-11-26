const express    = require("express"),
      router     = express.Router({mergeParams: true}),
      Cats       = require("../models/cat"),
      Comment    = require("../models/comment");
      middleware = require("../middleware/index");
/// comments routes
router.get('/new',middleware.isLogged, (req, res)=>{
    Cats.findById(req.params.id, (err,cat)=>{
        if(err){
            console.log(err)
        }else {
            res.render("comments/new",{cat: cat})
        }
    });
});

router.post('/', middleware.isLogged,(req, res)=>{
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
                    req.flash("success", "Success, you added a comment");
                    res.redirect(`/cats/${cat.id}`)
                }
            })
        }
    })
});
router.get("/:comment_id/edit",middleware.checkCommentOwner,(req,res)=>{
    Comment.findById(req.params.comment_id, (err,foundComment)=>{
        if(err){
            console.log(err)
        }else{
            res.render("comments/edit",{comment:foundComment,catId: req.params.id});
        }
    })

});
router.put("/:comment_id/edit",middleware.checkCommentOwner,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, (err,foundComment)=>{
        if(err){
            console.log(err);
        } else {
            req.flash("success","Comment edited");
            res.redirect("/cats/" + req.params.id)
        }
    })
});
router.delete("/:comment_id/delete",middleware.checkCommentOwner,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,(err,destroyed)=>{
        if(err){
            console.log(err)
        }else{
            req.flash("error","Comment deleted");
            res.redirect("/cats/"+req.params.id)
        }
    })
});


module.exports = router;