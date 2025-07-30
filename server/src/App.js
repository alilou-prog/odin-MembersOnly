require("dotenv").config()
const path = require("path")
const cors = require("cors")
const express = require('express')
const pg = require('pg')
const app = express()
const main_router = require("./routes/main_router")

// auth
const express_session = require("express-session")
const passport = require("./config/passport")
const pgSession = require('connect-pg-simple')(express_session)
const pg_pool = new pg.Pool({
    connectionString: process.env.DB_URL
})

// View Config
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// top-level middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const assets_path = path.join(__dirname, "public")
app.use(express.static(assets_path, {index: '_'}))

// Session config
app.use(express_session({
    store: new pgSession({
        pool: pg_pool,
        tableName: 'session',
    }),
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000},
}))
app.use(passport.session())


// routing
app.use('/', main_router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running. Listening on port ${PORT}`)
})

