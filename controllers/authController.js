import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();

        // Genera el token JWT
        const { token, expiresIn } = generateToken(user._id);
        // Genera el refresh token
        generateRefreshToken(user._id, res);

        return res.json({ token, expiresIn });
    } catch (error) {
        error.code === 11000
            ? res.json({ error: "Ya existe ese usuario" })
            : next(error);

        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });

        if (!user)
            return res.status(403).json({ error: "No existe el usuario" });

        const respuestaPassword = await user.comparePassword(password);

        if (!respuestaPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" });

        // Genera el token JWT
        const { token, expiresIn } = generateToken(user._id);
        // Genera el refresh token
        generateRefreshToken(user._id, res);

        res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email, uid: user._id });
    } catch (error) {
        return res.json({ error: error.message });
    }
};

export const refreshToken = async (req, res) => {
    //Cada vez que se visite la ruta, se genera un nuevo token a partir del refresh token
    try {
        const { token, expiresIn } = generateToken(req.uid);

        res.json({ token, expiresIn });
    } catch (error) {
        return res.json({ error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};
