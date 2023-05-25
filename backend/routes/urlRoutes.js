const express = require('express')
const router = express.Router()
const {
    getUrls,
    saveUrl,
    deleteUrl,
} = require('../controllers/urlController')

router.route('/getallurls').get(getUrls)
router.route('/saveurl').post(saveUrl)
router.route('/delete/:id').delete(deleteUrl)

module.exports = router
