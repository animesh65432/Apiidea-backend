import { Router } from "express"
import { googleAuth } from "../controllers"

const UserRouter = Router()

UserRouter.post("/googleauth", googleAuth)

export default UserRouter