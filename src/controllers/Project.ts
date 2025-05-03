import { Request, Response } from "express"
import { generateProjectIdeasWithDiagram } from "../utils"
import { asyncerrorhandler } from "../middleware"

const GenerateIdeaswithProjects = asyncerrorhandler(async (req: Request, res: Response) => {
    const { api } = req.body

    if (!api) {
        res.status(400).json({
            message: "api is required"
        })
    }

    const projectswithideas = await generateProjectIdeasWithDiagram(api)


    if (projectswithideas[0].name === "N/A") {
        res.status(400).json({
            message: "Something went wrong"
        })
        return
    }
    res.status(200).json(projectswithideas)
    return
})


export { GenerateIdeaswithProjects }