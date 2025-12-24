
import express from "express"

const app = express()

app.get("/poll", (req, res) => {
    setTimeout(()=>res.json({
        message:"polling"
    }),3000)
})

app.listen(3000 , ()=>console.log("server running at 3000"))
