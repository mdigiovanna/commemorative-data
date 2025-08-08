const express = require("express")
const router = express.Router()
const { db } = require("../server.js");
const fs = require('fs');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", (req, res) => {
    res.render("addmap.ejs")
})

router.post("/", upload.single("picture"), (req, res) => {

    const addMap = db.prepare("INSERT INTO maps (name, picture) VALUES (?, ?)");
    addMap.run(req.body.name, req.file.buffer);

    return res.redirect("/maps");
})

module.exports = router