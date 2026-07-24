import { useEffect, useState } from "react";

export function LoadingDots() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 350);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="mt-12 text-lg text-slate-400">
            Cargando{dots}
        </p>
    );
}