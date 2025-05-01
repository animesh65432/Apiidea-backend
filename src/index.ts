import config from "./config";
import router from "./router"
import express from "express";
import { errorMiddleware } from "./middleware"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api", router)
app.use(errorMiddleware)


app.listen(config.PORT, () => {
  console.log(`server start at ${config.PORT}`)
})