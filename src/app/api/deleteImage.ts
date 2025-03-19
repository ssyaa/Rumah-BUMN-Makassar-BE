import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { publicId } = req.body;

    if (!publicId) {
        return res.status(400).json({ error: "Public ID tidak ditemukan" });
    }

    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

        const response = await axios.post(
            cloudinaryUrl,
            {
                public_id: publicId
            },
            {
                auth: {
                    username: apiKey!,
                    password: apiSecret!,
                },
            }
        );

        return res.status(200).json({ message: "Gambar berhasil dihapus", response });
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return res.status(500).json({ error: "Gagal menghapus gambar" });
    }
}
