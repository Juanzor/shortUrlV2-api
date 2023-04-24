import { body, param } from "express-validator";
import { validationResult } from "express-validator";
import axios from "axios";

const validationsResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty() ? res.json({ errors: errors.array() }) : next();
};

// Valida si el link no viene con un script
export const validationsLinkParams = [
    param("id", "Formato no valido express validator")
        .trim()
        .notEmpty()
        .escape(), // <-- Remueve las etiquetas de <script></script>
    validationsResultExpress,
];

export const validationsLink = [
    body("longLink", "Formato de link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {
                if (!value.startsWith("https://")) {
                    value = "https://" + value;
                    console.log(value);
                }

                await axios.get(value);
                return value;
            } catch (error) {
                throw new Error("No se encontró el link");
            }
        }),

    validationsResultExpress,
];

export const validationsRegister = [
    body("email", "Email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Password invalido, minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 })
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las passwords");
            }
            return value;
        }),
    validationsResultExpress,
];

export const validationsLogin = [
    body("email", "Email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Password invalido, minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 })
        .bail(),
    validationsResultExpress,
];
