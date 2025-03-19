"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Sidebar from "../components/sidebar";
import "./contact.css";

interface Contact {
    nama: string;
    nope: string;
    [key: string]: any;
}

const programs = [
    { id: "DisplayProduk", name: "Display Produk" },
    { id: "ReviewProduk", name: "Review Produk" },
    { id: "Visit", name: "Visit Rumah Produksi" },
    { id: "LiveTiktok", name: "Live Tiktok" },
    { id: "ekatalog", name: "e-Katalog" },
];

export default function ContactPage() {
    const [contacts, setContacts] = useState<Record<string, Contact>>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedContact, setEditedContact] = useState<Contact>({ nama: "", nope: "" });

    useEffect(() => {
        const fetchContacts = async () => {
            const newContacts: Record<string, Contact> = {};
            for (const program of programs) {
                const docRef = doc(db, "personalContact", program.id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    newContacts[program.id] = {
                        nama: data.nama || "Tidak Diketahui",
                        nope: data.nope || "-",
                    };
                } else {
                    newContacts[program.id] = { nama: "Tidak Diketahui", nope: "-" };
                }
            }
            setContacts(newContacts);
        };
        fetchContacts();
    }, []);

    const handleEdit = (id: string) => {
        setEditingId(id);
        setEditedContact(contacts[id]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (id: string) => {
        const docRef = doc(db, "personalContact", id);
        await updateDoc(docRef, editedContact);
        setContacts((prev) => ({ ...prev, [id]: editedContact }));
        setEditingId(null);
    };

    return (
        <div className="container-contact">
            <Sidebar />
            <div className="content-contact">
                <div className="contentBox">
                    <h2 className="title">Kontak Personal</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead className="tableHeader">
                                <tr>
                                    <th className="tableCell">Program Kerja</th>
                                    <th className="tableCell">Nama Penanggung Jawab</th>
                                    <th className="tableCell">Nomor Telepon</th>
                                    <th className="tableCell">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {programs.map((program) => (
                                    <tr key={program.id} className="tableRow">
                                        <td className="tableCell">{program.name}</td>
                                        <td className="tableCell">
                                            {editingId === program.id ? (
                                                <input 
                                                    type="text" 
                                                    name="nama" 
                                                    value={editedContact.nama} 
                                                    onChange={handleChange} 
                                                />
                                            ) : (
                                                contacts[program.id]?.nama || "Mengambil data.."
                                            )}
                                        </td>
                                        <td className="tableCell">
                                            {editingId === program.id ? (
                                                <input 
                                                    type="text" 
                                                    name="nope" 
                                                    value={editedContact.nope} 
                                                    onChange={handleChange} 
                                                />
                                            ) : (
                                                contacts[program.id]?.nope || "Mengambil data.."
                                            )}
                                        </td>
                                        <td className="tableCell">
                                            {editingId === program.id ? (
                                                <button className="updateActionButton" onClick={() => handleUpdate(program.id)}>
                                                    Update
                                                </button>
                                            ) : (
                                                <button className="editActionButton" onClick={() => handleEdit(program.id)}>
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}