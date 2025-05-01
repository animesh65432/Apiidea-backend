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
exports.siginwithgoogle = void 0;
const config_1 = __importDefault(require("../config"));
const middleware_1 = require("../middleware");
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const siginwithgoogle = (0, middleware_1.asyncerrorhandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email } = req.body;
    if (!Email) {
        res.status(400).json({
            message: "Email is required"
        });
        return;
    }
    const exsitinguser = yield db_1.default.users.findUnique({
        where: {
            Email
        }
    });
    const token = jsonwebtoken_1.default.sign(Email, config_1.default.JSONWENTOKENSECRECT);
    if (exsitinguser) {
        res.status(200).json({
            message: "user alredy exsit ",
            token
        });
        return;
    }
    yield db_1.default.users.create({
        data: {
            Email
        }
    });
    res.status(201).json({
        message: "user create sucessfully",
        token
    });
    return;
}));
exports.siginwithgoogle = siginwithgoogle;
