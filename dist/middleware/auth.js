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
const db_1 = __importDefault(require("../db"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(400).json({
            messsage: "token is required"
        });
        return;
    }
    const Email = jsonwebtoken_1.default.verify(token, config_1.default.JSONWENTOKENSECRECT);
    if (!Email) {
        res.status(400).json({
            message: "token is not vaild"
        });
        return;
    }
    const checkuser = yield db_1.default.users.findUnique({
        where: {
            Email
        }
    });
    if (!checkuser) {
        res.status(400).json({
            message: "user did not found"
        });
        return;
    }
    req.user = checkuser;
    next();
});
exports.default = auth;
