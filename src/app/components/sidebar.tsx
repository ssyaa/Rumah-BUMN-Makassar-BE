import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { FaTachometerAlt, FaEdit, FaBook, FaAddressBook, FaSignOutAlt } from 'react-icons/fa';
import LoadingOverlay from '../components/loadingOverlay';
import ValidasiDelete from '../components/validasiLogout'; // Import modal konfirmasi
import Image from 'next/image';

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false); // State untuk modal konfirmasi logout

    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    const handleNavigation = (url: string) => {
        if (pathname === url) return;
        setIsLoading(true);
        router.push(url);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingOverlay />}
            {showConfirm && (
                <ValidasiDelete 
                    onConfirm={() => {
                        setShowConfirm(false);
                        handleLogout();
                    }} 
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            <div className="fixed top-0 left-0 w-64 h-screen flex flex-col bg-blue-900 text-white shadow-lg">
                <div className="bg-white p-3 flex flex-row items-center justify-center gap-4">
                    <Image src="/logo_bumn.png" alt="Logo BUMN" width={100} height={30} />
                    <Image src="/logo_rb_mks.jpeg" alt="Logo RB MKS" width={60} height={60} />
                </div>

                <div className="flex flex-col items-center p-6 flex-grow">
                    <ul className="space-y-4 w-full">
                        <li>
                            <button onClick={() => handleNavigation('/dashboard')} className="flex items-center space-x-3 hover:bg-blue-700 px-4 py-2 rounded-md w-full">
                                <FaTachometerAlt />
                                <span>Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/editekatalog')} className="flex items-center space-x-3 hover:bg-blue-700 px-4 py-2 rounded-md w-full">
                                <FaEdit />
                                <span>Edit E-Katalog</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/catalog')} className="flex items-center space-x-3 hover:bg-blue-700 px-4 py-2 rounded-md w-full">
                                <FaBook />
                                <span>Isi E-Katalog</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/kontakPersonal')} className="flex items-center space-x-3 hover:bg-blue-700 px-4 py-2 rounded-md w-full">
                                <FaAddressBook />
                                <span>Kontak Personal</span>
                            </button>
                        </li>
                    </ul>
                    <button
                        onClick={() => setShowConfirm(true)} // Tampilkan modal konfirmasi logout
                        className="mt-auto flex items-center justify-center space-x-3 bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
