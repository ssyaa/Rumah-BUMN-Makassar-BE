"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import Sidebar from "@/app/components/sidebar";
import SuccessOverlay from "@/app/components/successOverlay";
import LoadingOverlay from "@/app/components/loadingOverlay";
import Image from "next/image";

// Tipe data produk
interface ProductData {
    namaBrand: string;
    namaOwner: string;
    nope: string;
    alamatUsaha: string;
    igUsaha: string;
    deskShortProduk: string;
    harga: string;
    beratProduk: string;
    variantProduk: string;
    jenisUMKM: string;
    makeBrand: string;
    howProduction: string;
    selling: string;
    fotoProduk?: string;
    logoUMKM?: string;
    fotoOwner?: string;
    fotoProduksi?: string;
    qris?: string;
    }

    export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<ProductData>({
        namaBrand: "",
        namaOwner: "",
        nope: "",
        alamatUsaha: "",
        igUsaha: "",
        deskShortProduk: "",
        harga: "",
        beratProduk: "",
        variantProduk: "",
        jenisUMKM: "",
        makeBrand: "",
        howProduction: "",
        selling: "",
    });

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
        try {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            const data = docSnap.data() as ProductData;
            setProduct(data);
            setFormData({
                namaBrand: data.namaBrand || "",
                namaOwner: data.namaOwner || "",
                nope: data.nope || "",
                alamatUsaha: data.alamatUsaha || "",
                igUsaha: data.igUsaha || "",
                deskShortProduk: data.deskShortProduk || "",
                harga: String(data.harga) || "",
                beratProduk: String(data.beratProduk) || "",
                variantProduk: data.variantProduk || "",
                jenisUMKM: data.jenisUMKM || "",
                makeBrand: data.makeBrand || "",
                howProduction: data.howProduction || "",
                selling: data.selling || "",
            });
            } else {
            console.error("No such document!");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!id) return;
        setIsLoading(true);

        try {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
            ...formData,
            harga: formData.harga,
            beratProduk: formData.beratProduk,
        });
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            router.push("/editekatalog");
        }, 2000);
        } catch (error) {
        console.error("Error updating product:", error);
        setIsLoading(false);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        {isLoading && <LoadingOverlay />}
        {isSuccess && <SuccessOverlay />}
        <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 ml-[300px]">
            <h1 className="text-2xl font-bold text-center mb-4 text-blue-800">Edit Product</h1>
            <div className="space-y-4">
                <input type="text" name="namaBrand" value={formData.namaBrand} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Nama Brand"/>
                <input type="text" name="namaOwner" value={formData.namaOwner} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Nama Owner" />
                <input type="text" name="nope" value={formData.nope} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Nomor HP/Whatsapp" />
                <input type="text" name="alamatUsaha" value={formData.alamatUsaha} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Alamat Usaha" />
                <input type="text" name="igUsaha" value={formData.igUsaha} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Instagram Usaha" />
                <input type="text" name="deskShortProduk" value={formData.deskShortProduk} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Deskripsi Singkat Produk" />
                <input type="text" name="harga" value={formData.harga} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Harga" />
                <input type="text" name="beratProduk" value={formData.beratProduk} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Berat Produk" />
                <input type="text" name="variantProduk" value={formData.variantProduk} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Variant Produk" />
                <input type="text" name="jenisUMKM" value={formData.jenisUMKM} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Jenis UMKM" />

                <div className="text-center">
                {product?.fotoProduk && <Image src={Array.isArray(product.fotoProduk) && product.fotoProduk[0]? product.fotoProduk[0]: "/placeholder.png"} alt="Foto Produk" width={128} height={128} className="mx-auto rounded" />}
                <p className="text-sm text-gray-500">Foto Produk (Tidak dapat diubah)</p>
                </div>
                <div className="text-center">
                {product?.logoUMKM && <Image src={product.logoUMKM} alt="Logo UMKM" width={96} height={96} className="mx-auto rounded" />}
                <p className="text-sm text-gray-500">Logo UMKM (Tidak dapat diubah)</p>
                </div>
                <div className="text-center">
                {product?.fotoOwner && <Image src={product.fotoOwner} alt="Foto Owner" width={96} height={96} className="mx-auto rounded" />}
                <p className="text-sm text-gray-500">Foto Owner (Tidak dapat diubah)</p>
                </div>
                <div className="text-center">
                {product?.fotoProduksi && <Image src={Array.isArray(product.fotoProduksi) && product.fotoProduksi[0]? product.fotoProduksi[0]: "/placeholder.png"} alt="Foto Produksi" width={96} height={96} className="mx-auto rounded" />}
                <p className="text-sm text-gray-500">Foto Produksi (Tidak dapat diubah)</p>
                </div>
                <div className="text-center">
                {product?.qris && <Image src={product.qris} alt="Qris" width={96} height={96} className="mx-auto rounded" />}
                <p className="text-sm text-gray-500">Qris (Tidak dapat diubah)</p>
                </div>

                <input type="text" name="makeBrand" value={formData.makeBrand} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Ceritakan Bagaimana Terbentuknya Brand, Usaha, Produk Anda" />
                <input type="text" name="howProduction" value={formData.howProduction} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Ceritakan Bagaimana Cara Produksi Produk Anda" />
                <input type="text" name="selling" value={formData.selling} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Ceritakan Cara Penjualan Produk Anda" />
                <button onClick={handleUpdate} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update Product</button>
            </div>
            </div>
        </div>
        </div>
    );
}
