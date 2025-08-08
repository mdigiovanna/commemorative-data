const express = require("express")
const router = express.Router()
const { db } = require("../server.js");
const fs = require('fs');

router.get("/", (req, res) => {
    const byMap = db.prepare("SELECT * FROM benches WHERE mapid = ?")
    const allMaps = db.prepare("SELECT * FROM maps")
    const allBenches = db.prepare("SELECT * FROM benches")
    
    res.render("maps.ejs", { allMaps, byMap, allBenches })
})

router.get("/image/:id", (req, res) => {
    const stmt = db.prepare("SELECT picture FROM maps WHERE id = ?");
    const row = stmt.get(req.params.id);

    if (row && row.picture) {
        res.set("Content-Type", "image/png");
        res.send(row.picture);
    } else {
        res.status(404).send("Image not found.");
    }
});

module.exports = router;