"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./DashboardPage.css"; // Pastikan file CSS sesuai dengan lokasi yang benar

const db = getFirestore();

const DashboardPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [umkmCount, setUmkmCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchUMKMCount();
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    const fetchUMKMCount = async () => {
        try {
            const productsCollection = collection(db, "products");
            const productSnapshot = await getDocs(productsCollection);
            setUmkmCount(productSnapshot.size);
        } catch (error) {
            console.error("Error fetching UMKM count: ", error);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="dashboard-main">
                <div className="dashboard-content">
                    {user ? (
                        <div className="dashboard-text">
                            <h1>Welcome, {user?.displayName || user?.email}</h1>
                            <p>This is your protected dashboard page.</p>

                            <div className="dashboard-box">
                                <h2>UMKM BINAAN</h2>
                                <p>{umkmCount}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="loading-text">Loading...</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
