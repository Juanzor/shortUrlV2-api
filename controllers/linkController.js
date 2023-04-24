import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });

        return res.json({ links });
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};

// Lado de la vista
export const getLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;

        const link = await Link.findOne({ nanoLink });

        if (!link) return res.status(404).json({ error: "No existe el link" });

        return res.status(200).json({ longLink: link.longLink });
    } catch (error) {
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato de link incorrecto" });

        return res.status(500).json({ error: "Error de servidor" });
    }
};
// Para un crud tradicional
export const getLinkCRUD = async (req, res) => {
    try {
        const { id } = req.params;

        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "No existe el link" });

        // Verifica si el link le pertenece al usuario
        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece este id" });

        return res.status(200).json({ link });
    } catch (error) {
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato de link incorrecto" });

        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const createLink = async (req, res) => {
    try {
        const { longLink } = req.body;

        const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
        await link.save();

        return res.status(201).json({ link });
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const removeLink = async (req, res) => {
    try {
        const { id } = req.params;

        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "No existe el link" });

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece este id" });

        await link.remove();
        return res.json({ link });
    } catch (error) {
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato de link incorrecto" });
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { longLink } = req.body;
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "No existe el link" });

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece este id" });

        link.longLink = longLink;

        await link.save();

        return res.json({ link });
    } catch (error) {
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato de link incorrecto" });
        return res.status(500).json({ error: "Error de servidor" });
    }
};
