"use client";

import { useState } from "react";
import { firestore } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import styles from "../styles/Catalog.module.css";
import Sidebar from "../components/sidebar";
import LoadingOverlay from "../../app/components/loadingOverlay";
import SuccessOverlay from "../../app/components/successOverlay";
import Image from 'next/image';

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
  const [fotoProduk, setFotoProduk] = useState<File[]>([]);
  const [logoBrand, setLogoBrand] = useState<File[]>([]);
  const [fotoOwner, setFotoOwner] = useState<File[]>([]);
  const [fotoProduksi, setFotoProduksi] = useState<File[]>([]);
  const [qris, setQris] = useState<File[]>([]);
  const [makeBrand, setMakeBrand] = useState("");
  const [howProduction, setHowProduction] = useState("");
  const [selling, setSelling] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      const fotoProdukUrls = await Promise.all(fotoProduk.map(file => uploadToCloudinary(file)));
      const logoBrandUrl = logoBrand[0] ? await uploadToCloudinary(logoBrand[0]) : "";
      const fotoOwnerUrl = fotoOwner[0] ? await uploadToCloudinary(fotoOwner[0]) : "";
      const fotoProduksiUrls = await Promise.all(fotoProduksi.map(file => uploadToCloudinary(file)));
      const qrisUrl = qris[0] ? await uploadToCloudinary(qris[0]) : "";

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
        fotoProduk: fotoProdukUrls,
        logoBrand: logoBrandUrl,
        fotoOwner: fotoOwnerUrl,
        fotoProduksi: fotoProduksiUrls,
        qris: qrisUrl,
        makeBrand,
        howProduction,
        selling,
        createdAt: new Date(),
      });

      setIsLoading(false);
      setIsSuccess(true);

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
      setFotoProduk([]);
      setLogoBrand([]);
      setFotoOwner([]);
      setFotoProduksi([]);
      setQris([]);
      setMakeBrand("");
      setHowProduction("");
      setSelling("");

      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error("Error submitting catalog:", error);
      setIsLoading(false);
    }
  };

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<File[]>>, limit: number) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, limit);
      setState(Array.from(newFiles));
    }
  };

  const handleRemoveFile = (index: number, setState: React.Dispatch<React.SetStateAction<File[]>>) => {
    setState(prev => prev.filter((_, i) => i !== index));
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

            {/* Foto Produk (maksimal 5) */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Foto Produk (maksimal 5)</label>
              {fotoProduk.length < 5 && (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleAddFiles(e, setFotoProduk, 5)}
                  className={styles.input}
                />
              )}
              <div className={styles.previewContainer}>
                {fotoProduk.map((file, index) => (
                  <div key={index} className={styles.previewItem}>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className={styles.previewImageSmall}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index, setFotoProduk)}
                      className={styles.deleteButton}
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo Brand */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Logo Brand (maksimal 1)</label>
              {logoBrand.length < 1 && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAddFiles(e, setLogoBrand, 1)}
                  className={styles.input}
                />
              )}
              {logoBrand.map((file, index) => (
                <div key={index} className={styles.previewItem}>
                  <Image src={URL.createObjectURL(file)} alt="Logo Preview" className={styles.previewImageSmall} />
                  <button type="button" onClick={() => handleRemoveFile(index, setLogoBrand)} className={styles.deleteButton}>
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Foto Pemilik */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Foto Pemilik Usaha (maksimal 1)</label>
              {fotoOwner.length < 1 && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAddFiles(e, setFotoOwner, 1)}
                  className={styles.input}
                />
              )}
              {fotoOwner.map((file, index) => (
                <div key={index} className={styles.previewItem}>
                  <Image src={URL.createObjectURL(file)} alt="Owner Preview" className={styles.previewImageSmall} />
                  <button type="button" onClick={() => handleRemoveFile(index, setFotoOwner)} className={styles.deleteButton}>
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Foto Produksi */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Foto Tempat Produksi (maksimal 4)</label>
              {fotoProduksi.length < 4 && (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleAddFiles(e, setFotoProduksi, 4)}
                  className={styles.input}
                />
              )}
              <div className={styles.previewContainer}>
                {fotoProduksi.map((file, index) => (
                  <div key={index} className={styles.previewItem}>
                    <Image src={URL.createObjectURL(file)} alt="Produksi Preview" className={styles.previewImageSmall} />
                    <button type="button" onClick={() => handleRemoveFile(index, setFotoProduksi)} className={styles.deleteButton}>
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* QRIS */}
            <div className={styles.formGroup}>
              <label className={styles.label}>QRIS Barcode (maksimal 1)</label>
              {qris.length < 1 && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAddFiles(e, setQris, 1)}
                  className={styles.input}
                />
              )}
              {qris.map((file, index) => (
                <div key={index} className={styles.previewItem}>
                  <Image src={URL.createObjectURL(file)} alt="QRIS Preview" className={styles.previewImageSmall} />
                  <button type="button" onClick={() => handleRemoveFile(index, setQris)} className={styles.deleteButton}>
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Cerita */}
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
