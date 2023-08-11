"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponseMiddleware = void 0;
const errorResponseMiddleware = async (err, req, res, next) => {
    const status = err.statusCode || 500;
    const msg = err.message || "Something went wrong";
    res.status(status).json(msg);
};
exports.errorResponseMiddleware = errorResponseMiddleware;
//# sourceMappingURL=error.middleware.js.map