import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingOverlay = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex flex-col items-center justify-center z-50">
            {/* Animasi teks "Loading..." dengan titik yang muncul bertahap */}
            <motion.p
                className="text-white text-lg font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
                Loading
                <motion.span
                    key={dots}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >{dots}</motion.span>
            </motion.p>

            {/* Animasi Loading Spinner */}
            <motion.div
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingOverlay;