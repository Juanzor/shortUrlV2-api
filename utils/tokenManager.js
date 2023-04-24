import jwt from "jsonwebtoken";
export const generateToken = (uid) => {
    const expiresIn = 60 * 15;
    try {
        // Token que valida las peticiones
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn };
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 15;

    try {
        // El refresh token se firma y en el payload tiene el uid del usuario
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn,
        });

        // Se guarda el token en una cookie segura, ya que da lo mismo si es vulnerado o no
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
};
