"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const generative_ai_1 = require("@google/generative-ai");
const gentAi = new generative_ai_1.GoogleGenerativeAI(config_1.default.GENAIAPIKEY);
const AI_Model = gentAi.getGenerativeModel({ model: "gemini-1.5-flash" });
exports.default = AI_Model;
