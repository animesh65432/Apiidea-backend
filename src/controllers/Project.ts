import { Request, Response } from "express"
import { generateProjectIdeasWithDiagram } from "../utils"
import { asyncerrorhandler } from "../middleware"
import db from "../db"


const GenerateIdeaswithProjects = asyncerrorhandler(async (req: Request, res: Response) => {
    const { api } = req.body
    const userId = Number(req.user?.Id)

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
    const dataToInsert = projectswithideas.map(project => ({
        name: project.name,
        starterCode: project.starterCode,
        description: project.description,
        api,
        diagram: project.diagram,
        userId
    }));

    await db.projects.createMany({
        data: dataToInsert
    });
    res.status(200).json(projectswithideas)
    return
})

const Get = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.Id)

    const projectswithideas = await db.projects.findMany({
        where: {
            userId
        }
    })

    res.status(200).json(projectswithideas)
    return
})

export { GenerateIdeaswithProjects, Get }