"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = __importDefault(require("./Users"));
const Projects_1 = __importDefault(require("./Projects"));
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.use((0, middleware_1.rateLimiter)(20, 2 * 60 * 1000));
router.use("/users", Users_1.default);
router.use("/projects", Projects_1.default);
exports.default = router;
