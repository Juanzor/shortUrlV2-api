import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
    try {
        // Se obtiene el refresh token de la cookie
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) throw new Error("No existe token");

        // Verifica el token y devuelve la data (payload) que se firmo en jwt.sign() y
        const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH);

        req.uid = uid;

        next();
    } catch (error) {
        return res.json({ error: error.message });
    }
};
