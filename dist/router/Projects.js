"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const Project = (0, express_1.Router)();
Project.post("/generates", middleware_1.auth, controllers_1.GenerateIdeaswithProjects);
exports.default = Project;
