"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.GenerateIdeaswithProjects = void 0;
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const db_1 = __importDefault(require("../db"));
const GenerateIdeaswithProjects = (0, middleware_1.asyncerrorhandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { api } = req.body;
    const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.Id);
    if (!api) {
        res.status(400).json({
            message: "api is required"
        });
    }
    const projectswithideas = yield (0, utils_1.generateProjectIdeasWithDiagram)(api);
    if (projectswithideas[0].name === "N/A") {
        res.status(400).json({
            message: "Something went wrong"
        });
        return;
    }
    const dataToInsert = projectswithideas.map(project => ({
        name: project.name,
        starterCode: project.starterCode,
        description: project.description,
        api,
        diagram: project.diagram,
        userId
    }));
    yield db_1.default.projects.createMany({
        data: dataToInsert
    });
    res.status(200).json(projectswithideas);
    return;
}));
exports.GenerateIdeaswithProjects = GenerateIdeaswithProjects;
const Get = (0, middleware_1.asyncerrorhandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.Id);
    const projectswithideas = yield db_1.default.projects.findMany({
        where: {
            userId
        }
    });
    res.status(200).json(projectswithideas);
    return;
}));
exports.Get = Get;
