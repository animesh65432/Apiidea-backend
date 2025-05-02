"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const googleclient = new google_auth_library_1.OAuth2Client();
exports.default = googleclient;
