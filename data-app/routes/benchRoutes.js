const express = require("express")
const router = express.Router()
const { db } = require("../server.js");

router.get("/:id", (req, res) => {
    const statement = db.prepare("SELECT * FROM benches WHERE id = ?")
    const bench = statement.get(req.params.id)

    if(!bench) {
        return res.redirect('/')
    }
    else {
        res.render("oneBench", {bench})
    }
})

router.post("/delete/:id", (req, res) => {
    const statement = db.prepare("DELETE FROM benches WHERE id = ?")
    statement.run(req.params.id)

    // Send back to homepage after deleting the bench
    
    return res.redirect("/")
})

module.exports = router