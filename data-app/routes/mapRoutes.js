const express = require("express")
const router = express.Router()
const { db } = require("../server.js");

router.get("/", (req, res) => {
    const byPark = db.prepare("SELECT * FROM benches WHERE park = ?")
    const allParks = ['Allegheney Commons', 'Cliffside', 'FEC', 'Flagstaff', 'Frick', 'Highland', 'Mellon', 'Riverview', 'Schenley']
    
    res.render("maps.ejs", { allParks, byPark })
})

module.exports = router