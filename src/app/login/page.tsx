"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;
            console.log("User logged in:", user);
            router.push("/dashboard");
        } catch (error: unknown) {
            console.error("Login error:", error);
            if (error instanceof Error) {
                setErrorMessage("Login failed: " + error.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
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

                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default LoginPage;

