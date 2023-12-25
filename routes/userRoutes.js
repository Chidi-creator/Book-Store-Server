const express = require('express')
const { signupUser,getUsers, loginuser } = require('../controllers/userController')
const {adminAuth} = require('../middleware/adminAuth')

const router = express.Router()



//signup router
router.post('/signup', signupUser)

//login user
router.post('/login', loginuser )

router.use(adminAuth)
//get all users: for admin only
router.get('/', getUsers)



module.exports = router
