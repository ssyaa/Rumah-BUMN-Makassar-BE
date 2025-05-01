"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import ValidasiDelete from "../components/validasiDelete";
import LoadingOverload from "../components/loadingOverlay";
import SuccessOverload from "../components/successOverlay";
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import axios from "axios";
import "./editekatalog.css";

const db = getFirestore();

type Product = {
    id: string;
    namaBrand?: string;
    namaOwner?: string;
    nope?: string;
    igUsaha?: string;
    harga?: string;
    jenisUMKM?: string;
    imageUrl?: string;
};

const EditeKatalog = () => {
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleteImageUrl, setDeleteImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const itemsPerPage = 5;

    const router = useRouter();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push("/login");
            }
        });

        const unsubscribeProducts = onSnapshot(collection(db, "products"), (snapshot) => {
            const productList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
            setProducts(productList);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeProducts();
        };
    }, [router]);

    const handleEdit = (id: string) => {
        setIsLoading(true);
        router.push(`/editpage/${id}`);
    };

    const handleDeleteClick = (id: string, imageUrl?: string) => {
        setDeleteId(id);
        setDeleteImageUrl(imageUrl || null);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        setIsLoading(true);
        setShowConfirm(false);

        if (deleteId) {
            try {
                if (deleteImageUrl) {
                    await deleteImageFromCloudinary(deleteImageUrl);
                }
                await deleteDoc(doc(db, "products", deleteId));
                setIsSuccess(true);
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Terjadi kesalahan saat menghapus produk.");
            }
        }

        setIsLoading(false);
        setTimeout(() => setIsSuccess(false), 2000);
    };

    const deleteImageFromCloudinary = async (imageUrl: string) => {
        try {
            const publicId = imageUrl.split("/").pop()?.split(".")[0];
            await axios.post("/api/deleteImage", { publicId });
        } catch (error) {
            console.error("Error deleting image from Cloudinary: ", error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.namaBrand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedProducts = filteredProducts.slice(0, itemsPerPage); // ambil halaman pertama saja

    return (
        <div className="edit-container">
            <Sidebar />
            <main className="edit-main">
                <div className="edit-content">
                    {user ? (
                        <>
                            <h2 className="edit-title">Daftar UMKM</h2>
                            <input
                                type="text"
                                placeholder="Cari UMKM..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="edit-search"
                            />
                            <div className="table-container">
                                <div className="table-header">
                                    <span>Nama UMKM</span>
                                    <span>Nama Owner</span>
                                    <span>Nomor Telepon</span>
                                    <span>Instagram</span>
                                    <span>Harga</span>
                                    <span>Jenis UMKM</span>
                                    <span>Aksi</span>
                                </div>
                                {paginatedProducts.length > 0 ? (
                                    paginatedProducts.map((product) => (
                                        <div className="table-row" key={product.id}>
                                            <span>{product.namaBrand || "-"}</span>
                                            <span>{product.namaOwner || "-"}</span>
                                            <span>{product.nope || "-"}</span>
                                            <span>{product.igUsaha || "-"}</span>
                                            <span>{product.harga || "-"}</span>
                                            <span>{product.jenisUMKM || "-"}</span>
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-button"
                                                    onClick={() => handleEdit(product.id)}
                                                >
                                                    EDIT
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(product.id, product.imageUrl);
                                                    }}
                                                >
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-data">Mengambil data...</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </main>
            {showConfirm && <ValidasiDelete onConfirm={confirmDelete} onCancel={() => setShowConfirm(false)} />}
            {isLoading && <LoadingOverload />}
            {isSuccess && <SuccessOverload />}
        </div>
    );
};

export default EditeKatalog;
