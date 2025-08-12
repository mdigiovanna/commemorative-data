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
        addBench.run(req.body.id, req.body.benchnum, req.body.available, req.body.park, req.body.imoiho, req.body.honoree, req.body.donor, req.body.constid, req.body.inscription, req.body.giftamt, req.body.giftdate, req.body.infull, req.body.notes, 0, 0)
    }
    return res.redirect("/")
})

router.get("/edit-bench/:id", (req, res) => {
    const statement = db.prepare("SELECT * from benches WHERE id = ?")
    const bench = statement.get(req.params.id)

    if (!bench) {
        res.redirect("/")
    }

    res.render("editBench", {bench})
})

router.post("/edit-bench/:id", (req, res) => {
    const statement = db.prepare("SELECT * from benches WHERE id = ?")
    const bench = statement.get(req.params.id)
    const errors = []

    if (!bench) {
        res.redirect("/")
    }

    if(!req.body.benchnum) errors.push("Please input the bench number.")
    if(!req.body.park) errors.push("Please select a park.")

    if (errors.length) {
        return res.render("editPost.ejs", { errors })
    }

    else {
        const editBench = db.prepare("UPDATE benches SET (benchnum, available, park, imoiho, honoree, donor, constid, inscription, giftamt, giftdate, infull, notes) = (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = ?")
        editBench.run(req.body.benchnum, req.body.available, req.body.park, req.body.imoiho, req.body.honoree, req.body.donor, req.body.constid, req.body.inscription, req.body.giftamt, req.body.giftdate, req.body.infull, req.body.notes, req.params.id)
    }

    res.redirect(`/bench/:id`)
})

module.exports = router