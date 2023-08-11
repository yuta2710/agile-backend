import Joi from "joi";

export const create = Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().trim(),
});
