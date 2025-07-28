require("dotenv").config()
const path = require("path")
const cors = require("cors")
const express = require('express')
const router = require("./routes/main_router")
const app = express()

// config
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const assets_path = path.join(__dirname, "public")
app.use(express.static(assets_path))
app.use(cors())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running. Listening on port ${PORT}`)
})

app.use('/', router)