import { Router } from "express"
import { siginwithgoogle } from "../controllers"

const UserRouter = Router()

UserRouter.post("/googleauth", siginwithgoogle)

export default UserRouter