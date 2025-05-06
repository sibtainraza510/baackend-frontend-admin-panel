require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const authrouter = require("./routers/auth.router.js")
const contactrouter = require("./routers/contact.router.js")
const servicerouter = require("./routers/service.router.js")
const adminrouter = require("./routers/admin.router.js")
const connectDB = require("./utils/database.js")
const errorMiddleware = require("./middlewares/error.middleware.js")

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://mernadmintechsite.netlify.app",
        "https://baackend-frontend-admin-panel-1.onrender.com"
      ],
    methods : "GET, POST, DELETE, PATCH, PUT, HEAD",
    credentials : true
}

let PORT = process.env.PORT || 5000

app.use(cors(corsOptions))
//post krwate waqt iska use hota hai internally
app.use(express.json());
app.use("/api/auth" , authrouter)
app.use("/api/form", contactrouter)
app.use("/api/data",servicerouter)
//admin router;
app.use("/api/adminroute" , adminrouter)
app.get("/", (req,res)=>{
    res.status(200).send("home page");
})

app.use(errorMiddleware);
connectDB()
.then(()=>{
    app.listen(PORT , (req,res)=>{
        console.log("server is running at port " , PORT)
    
    })
})
.catch((error)=>{
    console.log("server not running " , error)
})
// app.get("/register", (req,res)=>{
//     res.status(200).json({
//         name : "raza"
//     })
// })

