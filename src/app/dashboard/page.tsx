"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Inisialisasi Firestore
const db = getFirestore();

const DashboardPage = () => {
    const [user, setUser] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]); // State untuk menyimpan data produk
    const router = useRouter();

    useEffect(() => {
        // Memeriksa apakah ada pengguna yang sedang login
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // Set user jika ada yang login
                fetchProducts(); // Panggil fungsi untuk ambil data produk setelah user login
            } else {
                router.push("/login"); // Redirect ke login jika belum login
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchProducts = async () => {
        try {
            const productsCollection = collection(db, "products"); // Ganti nama koleksi menjadi "products"
            const productSnapshot = await getDocs(productsCollection);
            const productList = productSnapshot.docs.map(doc => ({
                id: doc.id, // Ambil ID dokumen sebagai identifier
                ...doc.data() // Ambil data dari dokumen
            }));
            setProducts(productList); // Menyimpan data produk ke state
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar yang terpasang di kiri */}
            <Sidebar />
            <main className="flex-1 p-6 ml-64">
                {user ? (
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome to your Dashboard, {user.displayName || user.email}
                        </h1>
                        <p className="mt-2">This is your protected dashboard page.</p>

                        {/* Menampilkan daftar produk */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold">Product List</h2>
                            <ul>
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <li key={index} className="mt-4">
                                            <div className="border p-4 rounded-lg shadow-md">
                                                <h3 className="font-semibold">{product.name}</h3>
                                                <p>{product.description}</p>
                                                <p className="text-green-600">{product.price}</p>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </main>
        </div>
    );
};

export default DashboardPage;
