import { celebrate, Joi, Segments } from "celebrate";

export const transactionValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
  }),
});
