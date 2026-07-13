const Joi = require("joi");


const validateTransaction = (req, res, next) => {

   const transactionSchema = Joi.object({
    category_id: Joi.number().required(),

    recurring_transaction_id: Joi.number().allow(null),

    description: Joi.string().max(100).allow("", null),

    amount: Joi.number().required(),

    transaction_type: Joi.string()
        .valid("income", "expense")
        .required()
});


const { error } = transactionSchema.validate(req.body);

if (error) {
    return res.status(400).json({
        message: error.details[0].message
    });
}


};

module.exports = validateTransaction;