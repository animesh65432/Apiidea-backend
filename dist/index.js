"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const router_1 = __importDefault(require("./router"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api", router_1.default);
app.use(middleware_1.errorMiddleware);
app.listen(config_1.default.PORT, () => {
    console.log(`server start at ${config_1.default.PORT}`);
});
