import Joi from "joi";

export const login = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim()
})