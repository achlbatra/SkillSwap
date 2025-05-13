let express = require("express")
const { registerUser, login, updateUser, getUserById } = require("../controllers/userController")
const auth = require("../middleware/auth")

const UserRoutes = express.Router()

UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', login)
UserRoutes.put('/update-user/:id', auth, updateUser)
UserRoutes.get("/display-user-profile/:id", auth, getUserById);

module.exports = UserRoutes