const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const crawler = require("./crawler.js")
const log = console.log

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.post("/", (req, res, next) => {
  var uri = req.body.url
  if (!uri) next(new Error('Invalid!'))
  new crawler(uri).start().then((data) => {
    res.send(data)
  })
})

app.get("/", (req, res, next) => {
  res.send("Error")
})

app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app