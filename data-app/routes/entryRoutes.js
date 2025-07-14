const express = require("express")
const router = express.Router()
const { db } = require("../server.js");

router.use(function (req, res, next) {
    res.locals.errors = []
    next ()
})

router.get("/", (req, res) => {
    res.render("additem.ejs")
})

router.post("/", (req, res) => {
    const errors = []

    if(!req.body.benchnum) errors.push("Please input the bench number.")
    if(!req.body.park) errors.push("Please select a park.")

    if (errors.length) {
        return res.render("additem.ejs", { errors })
    }
    else {
        const addBench = db.prepare("INSERT INTO benches (id, benchnum, available, park, imoiho, honoree, donor, constid, inscription, giftamt, giftdate, infull, notes, x, y) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        addBench.run(req.body.id, req.body.benchnum, req.body.available, req.body.park, req.body.imoiho, req.body.honoree, req.body.donor, req.body.constid, req.body.inscription, req.body.giftamt, req.body.giftdate, req.body.infull, req.body.notes, req.body.x, req.body.y)
    }
    return res.redirect("/")
})

module.exports = router