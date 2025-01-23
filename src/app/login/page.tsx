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
            const userCredential = await signInWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
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

                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 My App. All rights reserved.</p>
            </footer>

            <style jsx>{`
                .form-group {
                    margin-bottom: 1rem;
                    text-align: left;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .login-button {
                    background-color: rgb(0, 30, 62);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    width: 100%;
                    border-radius: 4px;
                    font-size: 1rem;
                }
                .login-button:hover {
                    background-color: rgb(0, 30, 62);
                }
                .error-message {
                    color: red;
                    margin-top: 1rem;
                }
                .footer {
                    background-color: rgb(255, 255, 255);
                    color: white;
                    text-align: center;
                    padding: 3rem;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between; /* Distribute logos evenly */
                    align-items: center; /* Align logos vertically */
                }
                .footer img {
                    height: 50px; /* Adjust logo size */
                }
                .footer .logo_rb {
                    height: 80px; /* Increase the size of logo-rb */
                }
            `}</style>

            <footer className="footer">
                <div>
                    <img src="/logo_bumn.png" alt="Logo RB" />
                </div>
                <p>© 2025 My App. All rights reserved.</p>
                <div>
                    <img src="/logo_rbmks.jpeg" alt="Logo RB" className="logo_rb" />
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;
