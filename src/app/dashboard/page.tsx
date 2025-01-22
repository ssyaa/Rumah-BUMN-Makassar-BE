"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

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

    const handleLogout = async () => {
        try {
            await signOut(auth); // Logout pengguna
            router.push("/login"); // Redirect ke halaman login
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome to your Dashboard, {user.displayName || user.email}</h1>
                    <p>This is your protected dashboard page.</p>
                    {/* Tombol Logout */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DashboardPage;
