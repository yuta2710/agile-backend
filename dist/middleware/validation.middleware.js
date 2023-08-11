"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            const opts = {
                abortEarly: false,
                stripUnknown: true,
                allowedUnknown: true,
            };
            const values = await schema.validateAsync(req.body, opts);
            req.body = values;
            next();
        }
        catch (error) {
            throw new Error(`Unable to validate this middleware`);
        }
    };
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map