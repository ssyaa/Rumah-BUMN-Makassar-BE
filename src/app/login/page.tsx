"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingOverlay from "../components/loadingOverlay";
import "./login.css";

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error sebelum validasi
        setIsLoading(true);

        // Validasi input sebelum request ke Firebase
        if (!form.email && !form.password) {
            setErrorMessage("Masukkan email dan Password anda dengan Benar");
            setIsLoading(false);
            return;
        }
        if (!form.email) {
            setErrorMessage("Masukkan email anda");
            setIsLoading(false);
            return;
        }
        if (!form.password) {
            setErrorMessage("Masukkan password anda");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            console.log("User logged in:", userCredential.user);
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login error:", error);

            // Menangani error Firebase
            if (error.code === "auth/invalid-credential") {
                setErrorMessage("Email dan password yang anda masukkan salah. Masukkan ulang dengan benar");
            } else {
                setErrorMessage("Terjadi kesalahan: " + error.message);
            }
            
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    return (
        <div className="login-container">
            {isLoading && <LoadingOverlay />} {/* Tampilkan loading overlay jika sedang memuat */}
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}
            </div>

            <footer className="footer">
                <div>
                    <img src="/logo_bumn.png" alt="Logo BUMN" />
                </div>
                <p>© 2025 My App. All rights reserved.</p>
                <div>
                    <img src="/logo_rb_mks.jpeg" alt="Logo RB" className="logo_rb" />
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;
