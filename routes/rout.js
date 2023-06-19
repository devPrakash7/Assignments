
const expres = require("express");
const { create_new_user, login, getUser } = require("../controller/user.controller");
const { authenticate } = require("../middleware/auth");
const router = expres.Router();

//user_modules ................................
router.post('/createUser', create_new_user)
router.post('/login' , login);
router.get('/users' ,authenticate, getUser)








module.exports = router;