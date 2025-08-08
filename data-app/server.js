const express = require("express")
const db = require("better-sqlite3")("benches.db")
exports.db = db
db.pragma("journal_mode = WAL")
const { createTables } = require('./createTables.js')

createTables();

const app = express()

app.set("view engine", "ejs")
app.use(express.static("./public"))
app.use(express.urlencoded({extended: false}))

/*  render homepage - send a function that selects all benches from
    the inputed park and send an array of all parks to loop through */

app.get('/', (req, res) => {
    const byPark = db.prepare("SELECT * FROM benches WHERE park = ?")
    const allParks = ['Allegheney Commons', 'Cliffside', 'FEC', 'Flagstaff', 'Frick', 'Highland', 'Mellon', 'Riverview', 'Schenley']
    
    res.render("homepage", { allParks, byPark })
})

// setting up routes for making entries and managing bench data 

const entryRoutes = require('./routes/entryRoutes.js')
app.use("/entry", entryRoutes)

const benchRoutes = require('./routes/benchRoutes.js') 
app.use("/bench", benchRoutes)

const mapRoutes = require('./routes/mapRoutes.js')
app.use("/maps", mapRoutes)

const mapEntryRoutes = require('./routes/mapEntryRoutes.js')
app.use("/addmap", mapEntryRoutes)

const userGuideRoutes = require('./routes/userGuideRoutes.js')
app.use("/userguide", userGuideRoutes)

app.listen(3000)