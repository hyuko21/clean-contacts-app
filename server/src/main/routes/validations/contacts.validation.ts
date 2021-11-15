import { celebrate, Joi, Segments } from 'celebrate'

export const AddContactValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.object().keys({
      houseNumber: Joi.number().required(),
      streetName: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required()
    })
  })
})
