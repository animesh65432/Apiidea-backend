"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rateLimitStore = {};
const rateLimiter = (limit, windowMs) => {
    return (req, res, next) => {
        const ip = req.ip;
        if (!ip) {
            res.status(400).json({
                message: "did't found the ip "
            });
            return;
        }
        const currentTime = Date.now();
        const user = rateLimitStore[ip];
        if (!user) {
            rateLimitStore[ip] = { count: 1, lastRequest: currentTime };
            next();
            return;
        }
        const timePassed = currentTime - user.lastRequest;
        if (timePassed > windowMs) {
            rateLimitStore[ip] = { count: 1, lastRequest: currentTime };
            next();
            return;
        }
        if (user.count < limit) {
            rateLimitStore[ip].count += 1;
            next();
            return;
        }
        res.status(429).json({
            message: "Too many requests. Please try again later.",
        });
        return;
    };
};
exports.default = rateLimiter;
