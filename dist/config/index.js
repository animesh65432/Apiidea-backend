"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    PORT: process.env.PORT,
    GENAIAPIKEY: process.env.GENAIAPIKEY,
    JSONWENTOKENSECRECT: process.env.JSONWENTOKENSECRECT
};
exports.default = config;
