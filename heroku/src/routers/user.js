const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//Create User
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const user = new User({ name: `${firstName} ${lastName}`, email, password })
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(404).send(error)
    }
})

//Get User Profile
router.get('/users/me', auth, async (req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }    
})

// //Delete User
// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         res.status(200).send(req.user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

//Logout User
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

//Logout user from all sessions 
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router