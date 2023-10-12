import joi from "joi";

export async function singUpSchema(req, res, next) {
  const user = req.body;
  const userSchema = joi.object({
    name: joi.string().min(5).max(40).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi
      .string()
      .pattern(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/
      )
      .required(),
    repeatPassword: joi.string().required().valid(joi.ref("password")),
  });

  const validation = userSchema.validate(user, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}

export async function signInSchema(req, res, next) {
  const signInSchema = joi.object({
    password: joi
      .string()
      .pattern(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/
      )
      .required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });

  const validation = signInSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send("Invalid e-mail or password");
    return;
  }
  next();
}

export async function productSchema(req, res, next) {
  const productSchema = joi.object({
    image: joi.string().uri().required(),
    title: joi.string().max(100).min(5).required(),
    price: joi.number().required(),
    seller: joi.string().max(30).min(2).required(),
    description: joi.string().min(20).max(1500),
    category: joi
      .string()
      .valid(
        "Fantasia",
        "Biografia",
        "Romance",
        "Ficção científica",
        "Horror",
        "Thriller",
        "Tecnologia e Ciência",
        "Autoajuda"
      ),
  });

  const validation = productSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}

export async function orderSchema(req, res, next) {
  const order = req.body;
  const orderSchema = joi.object({
    image: joi.string().uri().required(),
    title: joi.string().max(100).min(5).required(),
    price: joi.number().required(),
    address: joi.string().required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    name: joi.string().min(5).max(40).required(),
    quantity: joi.number().integer().required(),
  });

  const validation = orderSchema.validate(order, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}
