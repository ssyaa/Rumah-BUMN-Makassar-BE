"use client";

import { useState } from "react";
import { firestore } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Impor useRouter
import styles from '../styles/Catalog.module.css'; // Import file CSS
import Sidebar from "../components/sidebar";

const Catalog = () => {
  const [namaBrand, setNamaBrand] = useState("");
  const [namaOwner, setNamaOwner] = useState("");
  const [descProduct, setdescProduct] = useState("");
  const [price, setPrice] = useState("");
  const [jenisUmkm, setjenisUmkm] = useState("F&B"); // Default ke F&B
  const [fotoProduk, setFotoProduk] = useState<File | null>(null);
  const [logoUMKM, setLogoUMKM] = useState<File | null>(null);
  const router = useRouter(); // Inisialisasi useRouter

  const CLOUDINARY_PRESET = "unsigned_preset";
  const CLOUDINARY_CLOUD_NAME = "demffxnd7";

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // URL gambar yang diunggah
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let fotoProdukUrl = "";
      let logoUMKMUrl = "";

      if (fotoProduk) {
        fotoProdukUrl = await uploadToCloudinary(fotoProduk);
      }

      if (logoUMKM) {
        logoUMKMUrl = await uploadToCloudinary(logoUMKM);
      }

      // Simpan data ke Firestore dalam koleksi "products"
      const docRef = await addDoc(collection(firestore, "products"), {
        namaBrand,
        descProduct,
        namaOwner,
        price: parseFloat(price),
        jenisUmkm,
        fotoProduk: fotoProdukUrl,
        logoUMKM: logoUMKMUrl,
        createdAt: new Date(),
      });

      console.log("Data berhasil disimpan dengan ID:", docRef.id);
      alert("Data berhasil disimpan!");
      setNamaBrand("");
      setdescProduct("");
      setNamaOwner("");
      setPrice("");
      setjenisUmkm("F&B");
      setFotoProduk(null);
      setLogoUMKM(null);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <div className={styles.container}> {/* Konten formulir */}
        <div className={styles.formWrapper}>
          <h1 className={styles.formHeader}>Isi E-Katalog</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama Brand</label>
              <input
                type="text"
                value={namaBrand}
                onChange={(e) => setNamaBrand(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Deskripsi Singkat</label>
              <textarea
                value={descProduct}
                onChange={(e) => setdescProduct(e.target.value)}
                required
                className={styles.textarea}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama Owner</label>
              <textarea
                value={namaOwner}
                onChange={(e) => setNamaOwner(e.target.value)}
                required
                className={styles.textarea}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Harga</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Jenis UMKM</label>
              <select
                value={jenisUmkm}
                onChange={(e) => setjenisUmkm(e.target.value)}
                required
                className={styles.input}
              >
                <option value="F&B">F&B</option>
                <option value="Fashion">Fashion</option>
                <option value="Craft">Craft</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Foto Produk</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setFotoProduk)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Logo UMKM</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setLogoUMKM)}
                required
                className={styles.input}
              />
            </div>
            <button
              type="submit"
              className={styles.buttonSubmit}
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Catalog;