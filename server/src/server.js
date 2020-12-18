require("dotenv").config()

const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const postCharge = require("./stripe")

const server = express()
const router = express.Router()
const port = process.env.PORT || 8000

router.post("/stripe/charge", postCharge)

router.all("*", (_, res) =>
    res.json({ message: "please make a POST request to /stripe/charge" })
)

server.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})
server.use(bodyParser.json())
server.use("/api", router)
server.use(express.static(path.join(__dirname, "../build")))

server.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"))
})

server.listen(port, () => console.log(`server running on port ${port}`))