"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleclient = exports.AI_Model = void 0;
const Ai_1 = __importDefault(require("./Ai"));
exports.AI_Model = Ai_1.default;
const google_1 = __importDefault(require("./google"));
exports.googleclient = google_1.default;
