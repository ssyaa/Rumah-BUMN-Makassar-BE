import React from "react";

interface ValidasiDeleteProps {
    onConfirm: () => void;
    onCancel: () => void;
    }

    const ValidasiDelete: React.FC<ValidasiDeleteProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="overlay">
        <div className="modal">
            <p>Apakah Anda yakin ingin menghapus data?</p>
            <div className="button-group">
            <button className="delete-button" onClick={onConfirm}>Hapus</button>
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
        <style jsx>{`
            .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.25);
            display: flex;
            justify-content: center;
            align-items: center;
            }
            .modal {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            }
            .button-group {
            margin-top: 15px;
            display: flex;
            justify-content: space-around;
            }
            .delete-button {
            background: red;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            }
            .cancel-button {
            background: gray;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            }
        `}</style>
        </div>
    );
};

export default ValidasiDelete;
