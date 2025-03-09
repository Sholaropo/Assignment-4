import Joi, { ObjectSchema } from "joi";

export const loanSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .optional()
        .messages({ "string.empty": "Loan ID cannot be empty" }),
    amount: Joi.string().required().messages({
        "any.required": "Amount is required",
        "string.empty": "Amount cannot be empty",
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty",
    }),
    approved: Joi.boolean().required().messages({
        "any.required": "Approval status is required",
    }),
    reviewed: Joi.boolean().required().messages({
        "any.required": "Review status is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

export const deleteLoanSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({ "string.empty": "Loan ID cannot be empty" }),
});
