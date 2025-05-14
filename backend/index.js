let express = require("express")
let mongoose = require("mongoose")
const UserRoutes = require("./apps/routes/userRoutes")
const MatchRoutes = require("./apps/routes/matchrequestRoutes")
const Messageroutes = require("./apps/routes/messageRoutes")
const cors = require("cors");


require("dotenv").config()

let app = express()
app.use(cors());
app.use(express.json())
app.use("/skillswap/api/user", UserRoutes)
app.use("/skillswap/api/matchrequest", MatchRoutes)
app.use("/skillswap/api/message", Messageroutes)

mongoose.connect(process.env.DBURL).then(()=>{
  console.log("Mongodb Connected")
  app.listen(process.env.PORT, ()=>{
    console.log("Server connected to PORT", process.env.PORT)
  })
})