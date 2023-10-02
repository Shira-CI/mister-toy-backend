const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const logger = require('./services/logger.service')

const app = express()
const http = require('http').createServer(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173','http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))


const authRoutes = require('./api/auth/auth.routes')
app.use('/api/auth', authRoutes)

const userRoutes = require('./api/user/user.routes')
app.use('/api/user', userRoutes)

const toyRoutes = require('./api/toy/toy.routes')
app.use('/api/toy', toyRoutes)

const reviewRoutes = require('./api/review/review.routes')
app.use('/api/review', reviewRoutes)

const port = process.env.PORT || 3030

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})