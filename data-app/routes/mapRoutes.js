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
})

router.post("/delete/:id", (req, res) => {
    const resetbenches = db.prepare("UPDATE benches SET mapid = ?, x = ?, y = ? WHERE mapid = ?")
    const delmap = db.prepare("DELETE FROM maps WHERE id = ?")

    resetbenches.run(0, 0, 0, req.params.id)
    delmap.run(req.params.id)

    // Send back to map page after deleting the map and resetting benches
    
    return res.redirect("/maps")
})

module.exports = router;