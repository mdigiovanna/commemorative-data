const { db } = require("./server.js");

// Database setup - table to store all benches

const createTables = db.transaction(() => {
    db.prepare(`
        CREATE TABLE benches (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            benchnum    INTEGER,
            available   BOOLEAN DEFAULT 1,
            park        TEXT,
            imoiho      TEXT DEFAULT "None",
            honoree     TEXT DEFAULT "None",
            donor       TEXT DEFAULT "None",
            constid     INTEGER DEFAULT "0",
            inscription TEXT DEFAULT "None",
            giftamt     FLOAT DEFAULT "0",
            giftdate    DATE DEFAULT "01-01-2025",
            infull      BOOLEAN DEFAULT 0,
            notes       TEXT DEFAULT "",
            x           INTEGER DEFAULT "1",
            y           INTEGER DEFUALT "1",
        )
    `).run();
});

exports.createTables = createTables;