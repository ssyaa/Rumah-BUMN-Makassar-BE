import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

const SuccessOverlay = ({ message = "Berhasil!" }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center transition-opacity animate-fadeIn">
        <div className="flex flex-col items-center animate-bounce">
            <CheckCircle className="w-20 h-20 text-green-500" />
            <p className="text-white text-lg font-semibold mt-2">{message}</p>
        </div>
        </div>
    );
};

export default SuccessOverlay;
