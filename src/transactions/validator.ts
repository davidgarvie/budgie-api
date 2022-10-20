import { celebrate, Joi, Segments } from "celebrate";

export const transactionBodyValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
  }),
});
