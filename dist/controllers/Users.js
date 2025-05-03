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
exports.googleAuth = void 0;
const config_1 = __importDefault(require("../config"));
const middleware_1 = require("../middleware");
const db_1 = __importDefault(require("../db"));
const service_1 = require("../service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const googleAuth = (0, middleware_1.asyncerrorhandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential, clientId } = req.body;
    if (!credential || !clientId) {
        res.status(400).json({ message: "Missing credential or client ID" });
        return;
    }
    const ticket = yield service_1.googleclient.verifyIdToken({
        idToken: credential,
        audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
        res.status(400).json({ message: "Invalid Google token payload" });
        return;
    }
    const { email } = payload;
    let user = yield db_1.default.users.findUnique({
        where: {
            Email: email
        },
    });
    if (!user) {
        user = yield db_1.default.users.create({
            data: { Email: email },
        });
    }
    const token = jsonwebtoken_1.default.sign(email, config_1.default.JSONWENTOKENSECRECT);
    res.status(user ? 200 : 201).json({
        message: user ? "Successfully logged in" : "Account created and logged in",
        token
    });
    return;
}));
exports.googleAuth = googleAuth;
