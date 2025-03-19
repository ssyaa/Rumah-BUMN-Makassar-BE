import React from "react";

interface ValidasiLogoutProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ValidasiLogout: React.FC<ValidasiLogoutProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="modal">
                <p>Apakah Anda yakin ingin keluar?</p>
                <div className="button-group">
                    <button className="delete-button" onClick={onConfirm}>Keluar</button>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
            <style jsx>{`
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999; /* Supaya modal selalu di atas */
                }
                .modal {
                    background: white;
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                }
                .button-group {
                    margin-top: 20px;
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

export default ValidasiLogout;
