const router = require('express').Router()
const local = require('./local')
// const googleRouter = require('./google')

router.use('/local', local)

// router.use('/google', googleRouter)

module.exports = router