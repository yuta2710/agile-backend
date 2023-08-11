import Joi from "joi";

export const create = Joi.object({
    name: Joi.string().required().trim(), 
    email: Joi.string().email().required().trim(), 
    password: Joi.string().required().min(6).trim(), 
    role: Joi.string().required().trim()
});