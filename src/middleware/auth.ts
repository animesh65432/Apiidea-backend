import { Request, Response, NextFunction } from "express"
import db from "../db"
import config from "../config"
import JSONWEBTOEKN from "jsonwebtoken"

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]
    if (!token) {
        res.status(400).json({
            messsage: "token is required"
        })
        return
    }

    const Email = JSONWEBTOEKN.verify(token, config.JSONWENTOKENSECRECT as string) as string
    if (!Email) {
        res.status(400).json({
            message: "token is not vaild"
        })
        return
    }

    const checkuser = await db.users.findUnique({
        where: {
            email: Email
        }
    })

    if (!checkuser) {
        res.status(400).json({
            message: "user did not found"
        })
        return
    }

    req.user = checkuser
    next()

}


export default auth