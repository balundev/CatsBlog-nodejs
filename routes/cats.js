const express = require("express"),
      router  = express.Router(),
      Cats    = require("../models/cat");
/// show all cats from DB
router.get('/', (req, res) => {
    Cats.find({}, (err, allCats) => {
        if (err) {
            console.log("error find")
        } else {
            console.log(allCats);
            res.render("cats/index", {cats: allCats})
        }
    });
});
/// add new cat to DB
router.post("/", (req, res) => {

    const newCat = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Cats.create(newCat, (err, cat) => {
        if (err) console.log("wrong");
        console.log("saved");
        res.redirect('/cats');
    });
});
// show form
router.get('/new', (req, res) => {
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

module.exports = router;