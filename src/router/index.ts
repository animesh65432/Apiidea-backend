import { Router } from "express"
import Users from "./Users"
import Project from "./Projects"
import { rateLimiter } from "../middleware"

const router = Router()

router.get("/check", (req, res) => {
    res.status(200).json({
        message: "okaty"
    })
})

router.use(rateLimiter(20, 2 * 60 * 1000))
router.use("/users", Users)
router.use("/projects", Project)

export default router