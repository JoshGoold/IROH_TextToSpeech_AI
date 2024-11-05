const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
const speak = require("./routes/text_to_speech")


app.use(express.json())
app.use(cors())
app.use("/", speak)

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server started: \nhttp://localhost:${PORT}`))

app.get("/", (req,res)=> {
  try{
    res.send("Server is Online!")
  }
  catch(e){
    console.error("Error occured in base route",e) 
  }
})

