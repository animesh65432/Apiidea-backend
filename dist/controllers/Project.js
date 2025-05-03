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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateIdeaswithProjects = void 0;
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const GenerateIdeaswithProjects = (0, middleware_1.asyncerrorhandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { api } = req.body;
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
    res.status(200).json(projectswithideas);
    return;
}));
exports.GenerateIdeaswithProjects = GenerateIdeaswithProjects;
