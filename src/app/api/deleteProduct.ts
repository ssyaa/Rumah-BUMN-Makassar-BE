import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID produk tidak ditemukan" });
    }

    try {
        await deleteDoc(doc(db, "products", id));
        return res.status(200).json({ message: "Produk berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting product from Firestore:", error);
        return res.status(500).json({ error: "Gagal menghapus produk" });
    }
}
