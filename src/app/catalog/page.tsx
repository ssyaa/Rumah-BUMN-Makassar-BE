"use client";

import { useState } from "react";
import { firestore } from "../../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Impor useRouter

const Catalog = () => {
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const router = useRouter(); // Inisialisasi useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simpan data ke Firestore
      const docRef = await addDoc(collection(firestore, "Catalog"), {
        namaProduk,
        deskripsi,
        harga: parseFloat(harga),
        createdAt: new Date(),
      });

      console.log("Data berhasil disimpan dengan ID:", docRef.id);
      alert("Data berhasil disimpan!");
      setNamaProduk("");
      setDeskripsi("");
      setHarga("");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()} // Aksi untuk kembali ke halaman sebelumnya
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Kembali
      </button>
      <h1 className="text-2xl font-bold mb-4">Isi E-Katalog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            type="text"
            value={namaProduk}
            onChange={(e) => setNamaProduk(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default Catalog;
