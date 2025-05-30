const { body, param, validationResult } = require("express-validator");

// Middleware para manejar los resultados de la validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createTaskValidator = [
  body("titulo")
    .trim()
    .isString().withMessage("El título debe ser un texto.")
    .notEmpty().withMessage("El título es obligatorio.")
    .isLength({ max: 100 }).withMessage("El título no puede superar 100 caracteres."),
  body("descripcion")
    .isString().withMessage("El título debe ser un texto.")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("La descripción no puede superar 500 caracteres."),
  validate,
];

const idParamValidator = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero."),
  validate,
];

const updateStatusValidator = [
  body("status")
    .notEmpty().withMessage("El estado es obligatorio.")
    .isIn(["pendiente", "completada"]).withMessage("El estado debe ser 'pendiente' o 'completada'."),
  validate,
];

module.exports = {
  createTaskValidator,
  idParamValidator,
  updateStatusValidator,
};
