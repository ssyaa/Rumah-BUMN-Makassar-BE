// components/Sidebar.tsx
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase-config';

const Sidebar = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white">
            <div className="flex flex-col items-start p-6">
                <h2 className="text-xl font-bold mb-6">My Dashboard</h2>
                <ul className="space-y-4">
                    <li>
                        <Link href="/dashboard" className="hover:bg-gray-700 px-4 py-2 rounded-md w-full block">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/catalog" className="hover:bg-gray-700 px-4 py-2 rounded-md w-full block">
                            Isi E-Katalog
                        </Link>
                    </li>
                    <li>
                        <Link href="/kontak-personal" className="hover:bg-gray-700 px-4 py-2 rounded-md w-full block">
                            Kontak Personal
                        </Link>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-500 text-white py-2 px-4 rounded-md w-full mt-6 hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
