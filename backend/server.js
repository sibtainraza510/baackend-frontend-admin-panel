require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./router/auth-route");
const connectDb = require("./utils/db");
const contactRouter = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
//middleware
app.use(cors(corsOptions));


//middleware
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRoute);
app.use(errorMiddleware);


const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
