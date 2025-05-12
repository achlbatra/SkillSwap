let express = require("express")
const { registerUser, login, updateUser, getUserById } = require("../controllers/userController")

const UserRoutes = express.Router()

UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', login)
UserRoutes.put('/update-user/:id', updateUser)
UserRoutes.get("/display-user-profile/:id", getUserById);

module.exports = UserRoutes