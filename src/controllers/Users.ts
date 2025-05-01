import config from "../config";
import { Request, Response, NextFunction } from "express"
import { asyncerrorhandler } from "../middleware"
import db from "../db";
import jsonwebtoken from "jsonwebtoken"


const siginwithgoogle = asyncerrorhandler(async (req: Request, res: Response, next: NextFunction) => {
    const { Email } = req.body

    if (!Email) {
        res.status(400).json({
            message: "Email is required"
        })
        return
    }



    const exsitinguser = await db.users.findUnique({
        where: {
            Email
        }
    })

    const token = jsonwebtoken.sign(Email, config.JSONWENTOKENSECRECT as string)
    if (exsitinguser) {
        res.status(200).json({
            message: "user alredy exsit ",
            token
        })
        return
    }

    await db.users.create({
        data: {
            Email
        }
    })

    res.status(201).json({
        message: "user create sucessfully",
        token
    })
    return
})
export { siginwithgoogle }