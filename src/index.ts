import config from "./config";
import router from "./router"
import express from "express";
import { errorMiddleware } from "./middleware"
import cors from "cors"

const app = express()
app.use(cors({
  origin: "*"
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api", router)
app.use(errorMiddleware)


app.listen(config.PORT, () => {
  console.log(`server start at ${config.PORT}`)
})