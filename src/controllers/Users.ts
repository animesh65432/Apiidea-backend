import config from "../config";
import { Request, Response } from "express"
import { asyncerrorhandler } from "../middleware"
import db from "../db";
import { googleclient } from "../service"
import jsonwebtoken from "jsonwebtoken"


const googleAuth = asyncerrorhandler(async (req: Request, res: Response) => {
    const { credential, clientId } = req.body;

    if (!credential || !clientId) {
        res.status(400).json({ message: "Missing credential or client ID" });
        return
    }

    const ticket = await googleclient.verifyIdToken({
        idToken: credential,
        audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
        res.status(400).json({ message: "Invalid Google token payload" });
        return
    }

    const { email } = payload

    let user = await db.users.findUnique({
        where: {
            email

        },
    });

    if (!user) {
        user = await db.users.create({
            data: { email },
        });
    }
    const token = jsonwebtoken.sign(email, config.JSONWENTOKENSECRECT as string)

    res.status(user ? 200 : 201).json({
        message: user ? "Successfully logged in" : "Account created and logged in",
        token
    });
    return
});


export { googleAuth }