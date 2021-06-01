const express = require('express');
const multer = require('multer')
const path = require('path')

const app = express()
require('dotenv').config()

//Middlewares
app.use(express.static('public'))
app.set(express.urlencoded({extended: true}))

// Storage setup
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        // returns new file with timestamp in the end
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// init upload
const upload = multer({
    storage: storage,
}).single('myImg')

//Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname, '/public/index.html')
})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(req.file)
            res.send('SUCCESS')
        }
    })
})

//

//PORT
const PORT = 8000 || process.env.PORT
app.listen(PORT, () => console.log(`Server running on ${PORT}`))