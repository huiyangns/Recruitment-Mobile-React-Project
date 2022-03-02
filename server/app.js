let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let router = require('./routes')
let cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//https://stackoverflow.com/questions/22432616/why-is-the-browser-not-setting-cookies-after-an-ajax-request-returns
//CORS requests will need {credentials:'include'} for both sending & receiving cookies 
app.use(cors({credentials:true, origin:/localhost:*/}))

app.use(router)

let server = app.listen(4000, function() {
    console.log('server is running at port 4000'); 
})

require('./socketIO')(server)
