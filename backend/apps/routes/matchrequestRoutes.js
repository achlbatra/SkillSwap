let express = require("express")
const { findMatch, sendMatchRequest, acceptRequest, declineRequest, acceptedMatches } = require("../controllers/matchrequestController")
let routes = express.Router()

routes.post("/find-match/:id", findMatch)
routes.post("/send-match-request", sendMatchRequest)
routes.post("/accept-request/:id", acceptRequest)
routes.post("/decline-request/:id", declineRequest)
routes.get("/get-my-matches/:id", acceptedMatches)

module.exports = routes