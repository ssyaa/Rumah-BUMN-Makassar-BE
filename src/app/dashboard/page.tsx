"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";

const DashboardPage = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // Memeriksa apakah ada pengguna yang sedang login
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // Set user jika ada yang login
            } else {
                router.push("/login"); // Redirect ke login jika belum login
            }
        });

        return () => unsubscribe();
    }, [router]);

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
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </main>
        </div>
    );
};

export default DashboardPage;
