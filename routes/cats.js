const express    = require("express"),
      router     = express.Router(),
      Cats       = require("../models/cat");
      middleware = require("../middleware/index");
/// show all cats from DB
router.get('/', (req, res) => {
    Cats.find({}, (err, allCats) => {
        if (err) {
            console.log("error find")
        } else {
            res.render("cats/index", {cats: allCats})
        }
    });
});
/// add new cat to DB
router.post("/",middleware.isLogged, (req, res) => {

    const newCat = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    };
    Cats.create(newCat, (err, cat) => {
        if (err) console.log("wrong");
        res.redirect('/cats');
    });
});
// show form
router.get('/new',middleware.isLogged, (req, res) => {
    res.render("cats/new")
});

router.get('/:id', (req, res) => {
    Cats.findById(req.params.id).populate("comments").exec((err, foundCat) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCat);
            res.render("cats/show", {cat: foundCat});
        }
    });
});

//edit routes
router.get('/:id/edit',middleware.checkCatOwner, (req,res)=>{
    Cats.findById(req.params.id, (err,foundCat)=>{
        if(err){
            res.redirect("/cats")
        }else{
            res.render("cats/edit",{cat: foundCat})
        }
    });
});
router.put('/:id/edit',middleware.checkCatOwner,(req,res)=>{
   Cats.findByIdAndUpdate(req.params.id,req.body.cat,(err,updatedCat)=>{
       if(err){
           res.redirect("/cats")
       }else{
           res.redirect("/cats/"+req.params.id)
       }
   })
});
//delete route
router.delete("/:id",middleware.checkCatOwner,(req,res)=>{
   Cats.findByIdAndRemove(req.params.id,(err,destroyed)=>{
       if(err){
           console.log(err)
       }else{
           res.redirect("/cats")
       }
   })
});

module.exports = router;