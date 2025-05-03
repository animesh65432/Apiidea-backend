"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/googleauth", controllers_1.googleAuth);
exports.default = UserRouter;
