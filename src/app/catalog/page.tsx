"use client";

import { useState } from "react";
import { firestore } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import styles from "../styles/Catalog.module.css";
import Sidebar from "../components/sidebar";
import LoadingOverlay from "../../app/components/loadingOverlay";
import SuccessOverlay from "../../app/components/successOverlay";

const Catalog = () => {
  const [namaBrand, setNamaBrand] = useState("");
  const [namaOwner, setNamaOwner] = useState("");
  const [nope, setNope] = useState("");
  const [alamatUsaha, setAlamatUsaha] = useState("");
  const [igUsaha, setIgUsaha] = useState("");
  const [deskShortProduk, setDeskShortProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [beratProduk, setBeratProduk] = useState("");
  const [variantProduk, setVariantProduk] = useState("");
  const [jenisUMKM, setJenisUMKM] = useState("");
  const [fotoProduk, setFotoProduk] = useState<File | null>(null);
  const [logoBrand, setLogoBrand] = useState<File | null>(null);
  const [fotoOwner, setFotoOwner] = useState<File | null>(null);
  const [fotoProduksi, setFotoProduksi] = useState<File | null>(null);
  const [qris, setQris] = useState<File | null>(null);
  const [makeBrand, setMakeBrand] = useState("");
  const [howProduction, setHowProduction] = useState("");
  const [selling, setSelling] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const CLOUDINARY_PRESET = "rumah-bumn";
  const CLOUDINARY_CLOUD_NAME = "doov2xe62";

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
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const fotoProdukUrl = fotoProduk ? await uploadToCloudinary(fotoProduk) : "";
      const logoBrandUrl = logoBrand ? await uploadToCloudinary(logoBrand) : "";
      const fotoOwnerUrl = fotoOwner ? await uploadToCloudinary(fotoOwner) : "";
      const fotoProduksiUrl = fotoProduksi ? await uploadToCloudinary(fotoProduksi) : "";
      const qrisUrl = qris ? await uploadToCloudinary(qris) : "";
  
      await addDoc(collection(firestore, "products"), {
        namaBrand,
        namaOwner,
        nope,
        alamatUsaha,
        igUsaha,
        deskShortProduk,
        harga,
        beratProduk,
        variantProduk,
        jenisUMKM,
        fotoProduk: fotoProdukUrl,
        logoBrand: logoBrandUrl,
        fotoOwner: fotoOwnerUrl,
        fotoProduksi: fotoProduksiUrl,
        qris: qrisUrl,
        makeBrand,
        howProduction,
        selling,
        createdAt: new Date(),
      });
  
      setIsLoading(false);
      setIsSuccess(true);
  
      // Reset form setelah berhasil submit
      setNamaBrand("");
      setNamaOwner("");
      setNope("");
      setAlamatUsaha("");
      setIgUsaha("");
      setDeskShortProduk("");
      setHarga("");
      setBeratProduk("");
      setVariantProduk("");
      setJenisUMKM("");
      setFotoProduk(null);
      setLogoBrand(null);
      setFotoOwner(null);
      setFotoProduksi(null);
      setQris(null);
      setMakeBrand("");
      setHowProduction("");
      setSelling("");
  
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting catalog:", error);
      setIsLoading(false);
    }
  };  
  
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      {isLoading && <LoadingOverlay />}
      {isSuccess && <SuccessOverlay />}
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.formHeader}>Isi E-Katalog</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Teks */}
            {[
              { label: "Nama Brand", state: namaBrand, setState: setNamaBrand },
              { label: "Nama Owner", state: namaOwner, setState: setNamaOwner },
              { label: "Nomor HP/Whatsapp", state: nope, setState: setNope },
              { label: "Alamat Usaha", state: alamatUsaha, setState: setAlamatUsaha },
              { label: "Instagram Usaha", state: igUsaha, setState: setIgUsaha },
              { label: "Deskripsi Singkat Produk", state: deskShortProduk, setState: setDeskShortProduk },
              { label: "Harga Produk", state: harga, setState: setHarga },
              { label: "Berat Produk", state: beratProduk, setState: setBeratProduk },
              { label: "Variant/Jenis Produk", state: variantProduk, setState: setVariantProduk },
              { label: "Jenis UMKM", state: jenisUMKM, setState: setJenisUMKM }
            ].map(({ label, state, setState }, index) => (
              <div key={index} className={styles.formGroup}>
                <label className={styles.label}>{label}</label>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
            ))}

            {/* Input File */}
            {[
              { label: "Foto Produk", state: fotoProduk, setState: setFotoProduk },
              { label: "Logo Brand", state: logoBrand, setState: setLogoBrand },
              { label: "Foto Pemilik Usaha", state: fotoOwner, setState: setFotoOwner },
              { label: "Foto Tempat Produksi", state: fotoProduksi, setState: setFotoProduksi },
              { label: "Qris Barcode", state: qris, setState: setQris },
            ].map(({ label, setState }, index) => (
              <div key={index} className={styles.formGroup}>
                <label className={styles.label}>{label}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setState(e.target.files ? e.target.files[0] : null)}
                  className={styles.input}
                />
              </div>
            ))}

            {/* Input Cerita */}
            {[
              { label: "Cerita Bagaimana UMKM Terbentuk", state: makeBrand, setState: setMakeBrand },
              { label: "Cerita Bagaimana Cara Produksi", state: howProduction, setState: setHowProduction },
              { label: "Cerita Bagaimana Cara Menjual", state: selling, setState: setSelling },
            ].map(({ label, state, setState }, index) => (
              <div key={index} className={styles.formGroup}>
                <label className={styles.label}>{label}</label>
                <textarea
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className={styles.textarea}
                />
              </div>
            ))}

            <button type="submit" className={styles.buttonSubmit}>Simpan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
