import { Router } from "express"
import { GenerateIdeaswithProjects, Get } from "../controllers"
import { auth } from "../middleware"

const Project = Router()
Project.post("/generates", auth, GenerateIdeaswithProjects)
Project.get("/get", auth, Get)

export default Project