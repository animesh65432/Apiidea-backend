import { Router } from "express"
import { GenerateIdeaswithProjects } from "../controllers"
import { auth } from "../middleware"

const Project = Router()
Project.post("/generates", auth, GenerateIdeaswithProjects)

export default Project