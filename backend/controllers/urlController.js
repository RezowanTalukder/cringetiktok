const asyncHandler = require('express-async-handler')

const Url = require('../models/urlModel')
const User = require('../models/userModel')


const getUrls = asyncHandler(async (req, res) => {
    const urls = await Url.find()

    res.status(200).json(urls)
})


const saveUrl = asyncHandler(async (req, res) => {
    if (!req.body.url) {
        res.status(400)
        throw new Error('Please add a Url')
    }

    const url = await Url.create({
        url: req.body.url,
        //user: req.user.id,
    })

    res.status(200).json(url)
})


const deleteUrl = asyncHandler(async (req, res) => {
    const url = await Url.findById(req.params.id)

    if (!url) {
        res.status(400)
        throw new Error('Url not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the url user
    if (url.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await url.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getUrls,
    saveUrl,
    deleteUrl,
}
