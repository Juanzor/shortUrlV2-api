import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if (!token) throw new Error("No existe token en el header, usá el bearer");

        token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.JWT_SECRET); // Decodifica la data (payload) que se firmo en jwt.sign()
        req.uid = uid; // Mando al req el id para pasarselo a la ruta siguiente
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error.message });
    }
};
